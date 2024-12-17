import Anthropic from '@anthropic-ai/sdk';

// the newest Anthropic model is "claude-3-5-sonnet-20241022" which was released October 22, 2024
const anthropic = new Anthropic({
  apiKey: process.env.VITE_ANTHROPIC_API_KEY,
});

export interface TranslationScore {
  accuracy: number;  // 0-100
  fluency: number;   // 0-100
  naturalness: number; // 0-100
  culturalContext: number; // 0-100
  overallScore: number; // 0-100
  feedback: string;
}

export async function scoreTranslation(
  sourceText: string,
  translatedText: string,
  sourceLang: 'en' | 'ro',
  targetLang: 'en' | 'ro'
): Promise<TranslationScore> {
  const prompt = `You are a translation quality expert. Please evaluate the following translation from ${sourceLang === 'en' ? 'English' : 'Romanian'} to ${targetLang === 'en' ? 'English' : 'Romanian'}.

Original text:
${sourceText}

Translation:
${translatedText}

Please analyze the translation and provide a detailed evaluation in JSON format with the following criteria:
- accuracy (0-100): How accurately the meaning is preserved
- fluency (0-100): How natural and fluid the translation reads
- naturalness (0-100): How well it fits the target language's conventions
- culturalContext (0-100): How well it adapts to the target culture
- overallScore (0-100): The weighted average score
- feedback: Detailed feedback and suggestions for improvement

Output only valid JSON.`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const result = JSON.parse(response.content[0].value);
    return {
      accuracy: result.accuracy,
      fluency: result.fluency,
      naturalness: result.naturalness,
      culturalContext: result.culturalContext,
      overallScore: result.overallScore,
      feedback: result.feedback
    };
  } catch (error) {
    console.error('Translation scoring error:', error);
    throw new Error('Failed to score translation');
  }
}

export async function analyzeTranslationQuality(translations: Array<{ original: string, translated: string }>, sourceLang: 'en' | 'ro', targetLang: 'en' | 'ro'): Promise<{
  scores: TranslationScore[];
  averageScore: number;
  recommendations: string;
}> {
  try {
    const scores = await Promise.all(
      translations.map(({ original, translated }) => 
        scoreTranslation(original, translated, sourceLang, targetLang)
      )
    );

    const averageScore = scores.reduce((acc, score) => acc + score.overallScore, 0) / scores.length;

    const prompt = `Based on these translation quality scores: ${JSON.stringify(scores)}, provide specific recommendations for improving the translation quality. Focus on patterns and systematic improvements.`;

    const recommendationsResponse = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    return {
      scores,
      averageScore,
      recommendations: recommendationsResponse.content[0].value
    };
  } catch (error) {
    console.error('Translation quality analysis error:', error);
    throw new Error('Failed to analyze translation quality');
  }
}
