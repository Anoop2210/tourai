/**
 * Local fallback budget calculator (used when OpenAI is unavailable,
 * or as the deterministic engine behind the Budget Calculator page).
 * All figures are per-trip totals in INR.
 */
export type BudgetTier = {
  travel: number;
  hotel: number;
  food: number;
  activities: number;
  localTransport: number;
  misc: number;
  total: number;
};

export type BudgetResult = {
  minimum: BudgetTier;
  average: BudgetTier;
  premium: BudgetTier;
};

const TRAVEL_MODE_BASE: Record<string, number> = {
  FLIGHT: 6000,
  TRAIN: 1800,
  BUS: 1200,
  CAR: 2500,
};

function tier(multiplier: number, days: number, travelers: number, travelMode: string): BudgetTier {
  const travel = Math.round((TRAVEL_MODE_BASE[travelMode] ?? 3000) * travelers * multiplier);
  const hotel = Math.round(1200 * multiplier * days * Math.ceil(travelers / 2));
  const food = Math.round(500 * multiplier * days * travelers);
  const activities = Math.round(400 * multiplier * days * travelers);
  const localTransport = Math.round(300 * multiplier * days);
  const misc = Math.round(0.08 * (travel + hotel + food + activities + localTransport));
  const total = travel + hotel + food + activities + localTransport + misc;
  return { travel, hotel, food, activities, localTransport, misc, total };
}

export function calculateBudget(days: number, travelers: number, travelMode: string): BudgetResult {
  return {
    minimum: tier(0.7, days, travelers, travelMode),
    average: tier(1.0, days, travelers, travelMode),
    premium: tier(1.8, days, travelers, travelMode),
  };
}
