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
      const { name, email, message } = req.body;

      // Log the form submission first for backup
      console.log('New Contact Form Submission:', {
        name,
        email,
        message,
        timestamp: new Date().toISOString()
      });

      // Attempt to send email
      try {
        const emailResult = await sendOnboardingEmail({
          companyName: name,
          email,
          message,
          industry: 'Not Specified' // Default value since we don't collect it in the basic form
        });

        // Send success response with email status
        res.json({ 
          success: true,
          message: emailResult.message || "Your message has been received successfully.",
          emailStatus: emailResult.success ? "sent" : "not_sent",
          details: emailResult.error
        });
      } catch (emailError) {
        console.error("Email sending error details:", emailError);

        // Even if email fails, we still want to acknowledge the form submission
        res.json({ 
          success: true,
          message: "Your message has been received successfully.",
          emailStatus: "failed",
          details: "We encountered an issue sending the confirmation email, but your request has been recorded."
        });
      }
    } catch (error: any) {
      console.error("Contact form submission error:", error);
      res.status(500).json({ 
        success: false,
        message: "Failed to process your request. Please try again.",
        error: error.message 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}