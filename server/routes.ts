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

  const httpServer = createServer(app);
  return httpServer;
}
