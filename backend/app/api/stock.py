from fastapi import APIRouter
from app.services.stock_service import (
    fetch_stock_data,
    fetch_stock_history,
    fetch_sma,
)

router = APIRouter(prefix="/stock", tags=["Stock"])


@router.get("/{ticker}")
def get_stock(ticker: str):
    return fetch_stock_data(ticker)


@router.get("/{ticker}/history")
def get_stock_history(ticker: str):
    return fetch_stock_history(ticker)


@router.get("/{ticker}/sma")
def get_sma(ticker: str):
    return fetch_sma(ticker)