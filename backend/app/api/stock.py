from fastapi import APIRouter, Query
from app.schemas.stock_schema import StockResponse
from app.services.stock_service import (
    fetch_stock_data,
    fetch_stock_history,
    fetch_sma,
)

router = APIRouter(prefix="/stock", tags=["Stock"])


@router.get("/{ticker}", response_model=StockResponse)
def get_stock(ticker: str):
    return fetch_stock_data(ticker)


@router.get("/{ticker}/history")
def get_stock_history(ticker: str):
    return fetch_stock_history(ticker)


@router.get("/{ticker}/sma")
def get_sma(
    ticker: str,
    window: int = Query(default=20, ge=2, le=200)
):
    return fetch_sma(ticker, window=window)