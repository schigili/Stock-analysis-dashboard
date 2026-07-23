from pydantic import BaseModel


class StockResponse(BaseModel):
    ticker: str
    company: str | None
    current_price: float | None
    currency: str | None
    sector: str | None