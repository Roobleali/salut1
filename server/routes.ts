import type { Express } from "express";
import { createServer, type Server } from "http";
import { scoreTranslation, analyzeTranslationQuality } from "../client/src/lib/translationScoring";
import { sendOnboardingEmail } from "./services/email";

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
      const { name, email, company, industry, currentSoftware, painPoints, cui, address, county, phone } = req.body;

      // Log the form submission first for backup
      console.log('New Implementation Request:', {
        name,
        email,
        company,
        cui,
        address,
        county,
        phone,
        industry,
        currentSoftware,
        painPoints
      });

      // Attempt to send email but don't fail if it doesn't work
      const emailResult = await sendOnboardingEmail({
        industry,
        cui,
        companyName: company,
        email,
        address,
        county,
        phone
      });

      // Always return success to the client, but include any email sending issues
      res.json({ 
        message: "Request received successfully",
        emailStatus: emailResult.success ? "sent" : "not_sent",
        note: emailResult.error
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      // Even if there's an error, we logged the submission, so we can still tell the user it was received
      res.json({ 
        message: "Request received successfully",
        emailStatus: "not_sent",
        note: "Your request has been logged but we encountered an issue sending the notification email."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}