from fastapi import APIRouter, Query

from app.schemas.stock_schema import StockResponse

from app.services.stock_service import (
    fetch_stock_data,
    fetch_stock_history,
    fetch_sma,
)

from app.services.search_service import search_companies

import yfinance as yf


router = APIRouter(prefix="/stock", tags=["Stock"])


@router.get("/search")
def search(query: str):
    return search_companies(query)


@router.get("/news/{ticker}")
def get_stock_news(ticker: str):
    stock = yf.Ticker(ticker.upper())

    news = stock.news

    results = []

    for item in news[:10]:
        content = item.get("content", {})

        results.append({
            "title": content.get("title"),
            "publisher": content.get("provider", {}).get("displayName"),
            "link": content.get("canonicalUrl", {}).get("url"),
        })

    return results


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