import type { Express } from "express";
import { createServer, type Server } from "http";
import { scoreTranslation, analyzeTranslationQuality } from "../client/src/lib/translationScoring";

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
        return res.status(400).json({ error: "CUI parameter is required" });
      }

      const apiKey = process.env.OPENAPI_RO_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "API key not configured" });
      }

      const response = await fetch(`https://api.openapi.ro/api/companies/${cui}`, {
        headers: {
          'x-api-key': apiKey
        }
      });

      if (!response.ok) {
        throw new Error(`OpenAPI.ro API error: ${response.statusText}`);
      }

      const data = await response.json();
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
        error: "Failed to lookup company" 
      });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, company, industry, otherIndustry, goal, otherGoal, message } = req.body;

      // Log the form submission for now (we'll add email functionality later)
      console.log('New Implementation Request:', {
        name,
        email,
        company,
        industry: industry === 'other' ? otherIndustry : industry,
        goal: goal === 'other' ? otherGoal : goal,
        message
      });

      res.json({ message: "Request received successfully" });
    } catch (error) {
      console.error("Contact form submission error:", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}