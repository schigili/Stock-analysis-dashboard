from pydantic import BaseModel


class StockResponse(BaseModel):
    ticker: str
    company: str | None
    current_price: float | None
    currency: str | None
    sector: str | None

    # Company Overview
    industry: str | None
    country: str | None
    employees: int | None
    market_cap: int | None
    pe_ratio: float | None
    fifty_two_week_high: float | None
    fifty_two_week_low: float | None