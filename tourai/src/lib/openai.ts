import OpenAI from "openai";

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Builds the structured prompt for itinerary generation.
 * The model is instructed to ALWAYS return valid JSON matching ItineraryResult.
 */
export function buildItineraryPrompt(input: {
  startingCity: string;
  destination: string;
  tripType: string;
  travelers: number;
  days: number;
  budget: number;
  travelMode: string;
}) {
  return `You are a professional travel planner AI. Generate a complete trip plan as STRICT JSON only (no markdown, no commentary, no code fences).

Trip details:
- From: ${input.startingCity}
- To: ${input.destination}
- Trip type: ${input.tripType}
- Travelers: ${input.travelers}
- Days: ${input.days}
- Budget (INR): ${input.budget}
- Travel mode: ${input.travelMode}

Return JSON with EXACTLY this shape:
{
  "tripSummary": string,
  "bestTimeToVisit": string,
  "weather": { "season": string, "tempRangeC": string, "notes": string },
  "dayWisePlan": [ { "day": number, "title": string, "activities": string[], "meals": string[], "estimatedCost": number } ],
  "placesToVisit": [ { "name": string, "description": string, "category": string } ],
  "foodRecommendations": [ { "dish": string, "where": string } ],
  "packingSuggestions": string[],
  "travelTips": string[]
}`;
}

export function buildBudgetPrompt(input: {
  destination: string;
  days: number;
  travelers: number;
  budget: number;
  travelMode: string;
}) {
  return `You are a travel budget estimation AI. Return STRICT JSON only, no markdown.

Estimate a realistic cost breakdown in INR for:
Destination: ${input.destination}, Days: ${input.days}, Travelers: ${input.travelers}, Mode: ${input.travelMode}, Target budget: ${input.budget}

Return JSON shape:
{
  "minimum": { "travel": number, "hotel": number, "food": number, "activities": number, "localTransport": number, "misc": number, "total": number },
  "average": { "travel": number, "hotel": number, "food": number, "activities": number, "localTransport": number, "misc": number, "total": number },
  "premium": { "travel": number, "hotel": number, "food": number, "activities": number, "localTransport": number, "misc": number, "total": number }
}`;
}
