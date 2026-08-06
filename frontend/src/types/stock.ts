export interface StockResponse {
  ticker: string;
  company: string | null;
  current_price: number | null;
  currency: string | null;
  sector: string | null;

  // Company Overview
  industry: string | null;
  country: string | null;
  employees: number | null;
  market_cap: number | null;
  pe_ratio: number | null;
  fifty_two_week_high: number | null;
  fifty_two_week_low: number | null;
}