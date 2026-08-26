import yfinance as yf
import pandas as pd


def fetch_stock_data(ticker: str):
    ticker = ticker.upper().strip()
    stock = yf.Ticker(ticker)

    # Start with safe defaults
    info = {}

    # Yahoo Finance metadata can occasionally fail or timeout.
    # Do not let that make the entire stock endpoint return 500.
    try:
        info = stock.info or {}
    except Exception:
        info = {}

    # Get current price from metadata first.
    current_price = info.get("currentPrice")

    # Fallback to recent market data if currentPrice is unavailable.
    if current_price is None:
        try:
            history = stock.history(period="5d")

            if not history.empty:
                current_price = float(history["Close"].dropna().iloc[-1])
        except Exception:
            current_price = None

    return {
        "ticker": ticker,
        "company": info.get("longName") or info.get("shortName") or ticker,
        "current_price": current_price,
        "currency": info.get("currency") or "USD",
        "sector": info.get("sector"),
        "industry": info.get("industry"),
        "country": info.get("country"),
        "employees": info.get("fullTimeEmployees"),
        "market_cap": info.get("marketCap"),
        "pe_ratio": info.get("trailingPE"),
        "fifty_two_week_high": info.get("fiftyTwoWeekHigh"),
        "fifty_two_week_low": info.get("fiftyTwoWeekLow"),
    }


def fetch_stock_history(ticker: str, period: str = "1mo"):
    ticker = ticker.upper().strip()
    stock = yf.Ticker(ticker)

    history = stock.history(period=period)

    data = []

    for date, row in history.iterrows():
        data.append({
            "date": date.strftime("%Y-%m-%d"),
            "open": round(float(row["Open"]), 2),
            "high": round(float(row["High"]), 2),
            "low": round(float(row["Low"]), 2),
            "close": round(float(row["Close"]), 2),
            "volume": int(row["Volume"])
        })

    return data


def fetch_sma(ticker: str, period: str = "3mo", window: int = 20):
    ticker = ticker.upper().strip()
    stock = yf.Ticker(ticker)

    history = stock.history(period=period)

    if history.empty:
        return []

    history["SMA"] = history["Close"].rolling(window=window).mean()

    data = []

    for date, row in history.iterrows():

        if pd.isna(row["SMA"]):
            continue

        data.append({
            "date": date.strftime("%Y-%m-%d"),
            "close": round(float(row["Close"]), 2),
            "sma": round(float(row["SMA"]), 2)
        })

    return data