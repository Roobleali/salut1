import type { Express } from "express";
import { createServer, type Server } from "http";
import sgMail from '@sendgrid/mail';
import { scoreTranslation, analyzeTranslationQuality } from "../client/src/lib/translationScoring";
import { odooService } from './services/odoo';

export function registerRoutes(app: Express): Server {
  // Translation scoring endpoints
  app.post("/api/translation/score", async (req, res) => {
    try {
      const { sourceText, translatedText, sourceLang, targetLang } = req.body;
      const score = await scoreTranslation(sourceText, translatedText, sourceLang, targetLang);
      res.json(score);
    } catch (error) {
      console.error("Translation scoring error:", error);
      res.status(500).json({ error: "Failed to score translation" });
    }
  });

  app.post("/api/translation/analyze", async (req, res) => {
    try {
      const { translations, sourceLang, targetLang } = req.body;
      const analysis = await analyzeTranslationQuality(translations, sourceLang, targetLang);
      res.json(analysis);
    } catch (error) {
      console.error("Translation analysis error:", error);
      res.status(500).json({ error: "Failed to analyze translations" });
    }
  });

  // Company lookup endpoint using OpenAPI.ro
  app.get("/api/anaf-lookup", async (req, res) => {
    try {
      const { cui } = req.query;
      if (!cui) {
        return res.status(400).json({
          found: false,
          error: "CUI parameter is required"
        });
      }

      // Remove any spaces or special characters from CUI
      const sanitizedCui = cui.toString().trim().replace(/[^0-9]/g, '');

      const response = await fetch(`https://api.openapi.ro/api/companies/${sanitizedCui}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'x-api-key': process.env.OPENAPI_RO_KEY || ''
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`OpenAPI.ro API error (${response.status}):`, errorText);

        if (response.status === 403) {
          return res.status(500).json({
            found: false,
            error: "Invalid API key or authorization error"
          });
        }

        if (response.status === 404) {
          return res.status(404).json({
            found: false,
            error: "Company not found"
          });
        }

        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data || !data.denumire) {
        return res.status(404).json({
          found: false,
          error: "Company data not available"
        });
      }

      res.json({
        found: true,
        denumire: data.denumire,
        cui: data.cui,
        adresa: data.adresa,
        judet: data.judet,
        telefon: data.telefon,
        cod_postal: data.cod_postal
      });
    } catch (error) {
      console.error("Company lookup error:", error);
      res.status(500).json({
        found: false,
        error: "Failed to lookup company. Please try again later."
      });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const {
        company,
        industry,
        currentSoftware,
        email,
        address,
        county,
        phone,
        cui
      } = req.body;

      if (!company || !email || !industry) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields"
        });
      }

      // Configure SendGrid
      sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

      const emailTemplate = `
New Implementation Request

Company Details:
---------------
Company Name: ${company}
Industry: ${industry}
Current Software: ${currentSoftware || 'Not specified'}
Email: ${email}
Address: ${address || 'Not provided'}
County: ${county || 'Not provided'}
Phone: ${phone || 'Not provided'}
CUI: ${cui || 'Not provided'}

Submission Time: ${new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })}
      `.trim();

      const msg = {
        to: 'info@saluttech.ro',
        from: {
          email: process.env.SENDGRID_FROM_EMAIL || '',
          name: 'Salut Enterprise Contact System'
        },
        replyTo: email,
        subject: `New Implementation Request - ${company}`,
        text: emailTemplate,
      };

      await sgMail.send(msg);

      res.json({
        success: true,
        message: "Your request has been submitted successfully. We'll be in touch shortly."
      });
    } catch (error: any) {
      console.error("Contact form submission error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to process your request. Please try again later.",
        error: error.message
      });
    }
  });

  // Odoo company creation endpoint
  app.post("/api/odoo/create-company", async (req, res) => {
    try {
      console.log("Received request body:", JSON.stringify(req.body, null, 2));

      const {
        name,
        email,
        phone,
        street,
        city,
        adminName,
        adminLogin,
        adminPassword
      } = req.body;

      // Validate required fields
      if (!name?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Company name is required"
        });
      }

      // Create company in Odoo
      const result = await odooService.createCompany({
        name,
        email,
        phone,
        street,
        city,
        adminName,
        adminLogin,
        adminPassword
      });

      res.json({
        success: true,
        message: "Company and user created successfully in Odoo",
        data: result
      });
    } catch (error: any) {
      console.error("Odoo integration error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create company in Odoo",
        error: error.message
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}