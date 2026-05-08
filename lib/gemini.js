import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is missing in .env.local");
}

export const genAI = new GoogleGenerativeAI(apiKey || 'placeholder');

const responseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    aggregate_score: {
      type: SchemaType.INTEGER,
      description: "Overall compatibility score from 0-100",
    },
    big5_score: {
      type: SchemaType.INTEGER,
      description: "Compatibility based on Big 5 traits (Agreeableness, Emotional Stability)",
    },
    attachment_score: {
      type: SchemaType.INTEGER,
      description: "Compatibility based on Attachment style (Secure, Anxious, Avoidant)",
    },
    gottman_score: {
      type: SchemaType.INTEGER,
      description: "Compatibility based on Gottman communication patterns (Four Horsemen)",
    },
    values_score: {
      type: SchemaType.INTEGER,
      description: "Compatibility based on Schwartz values alignment",
    },
    why_matched_paragraph: {
      type: SchemaType.STRING,
      description: "A paragraph explaining why they matched, grounded in the psychological frameworks. Cite the frameworks explicitly.",
    },
    icebreakers: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.STRING,
      },
      description: "An array of 3 specific conversation starters based on their compatibility and shared traits.",
    },
  },
  required: [
    "aggregate_score",
    "big5_score",
    "attachment_score",
    "gottman_score",
    "values_score",
    "why_matched_paragraph",
    "icebreakers",
  ],
};

export const matchModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: responseSchema,
  },
});

export const PROMPT_VERSION = "prompt_v2";
export const MODEL_VERSION = "gemini-2.5-flash";

export async function generateCompatibility(userA, userB) {
  const prompt = `
    You are an expert matchmaking AI grounded in published psychological frameworks.
    Analyze the compatibility between User A and User B based on the following frameworks:
    1. Big 5 Trait Alignment: Focus on Agreeableness and Emotional Stability.
    2. Attachment Theory: Evaluate compatibility based on Secure, Anxious, or Avoidant tendencies.
    3. Gottman Method: Evaluate communication patterns and potential for the Four Horsemen.
    4. Schwartz Values: Assess alignment in core life values and priorities.

    User A Data:
    Name: ${userA.name}
    Gender: ${userA.gender}
    Intent: ${userA.intent_mode || userA.intent}
    Values/Traits: ${JSON.stringify(userA.personality_answers || userA.values)}

    User B Data:
    Name: ${userB.name}
    Gender: ${userB.gender}
    Intent: ${userB.intent_mode || userB.intent}
    Values/Traits: ${JSON.stringify(userB.personality_answers || userB.values)}

    Analyze their compatibility deeply based ONLY on these frameworks. Return your structured JSON analysis.
  `;

  const result = await matchModel.generateContent(prompt);
  const text = result.response.text();
  
  try {
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Failed to parse Gemini output:", text);
    throw error;
  }
}
