import time

import pandas as pd
import yfinance as yf


def _get_info_safely(stock):
    """
    Safely retrieve Yahoo Finance company metadata.
    Yahoo can occasionally fail or return incomplete metadata,
    so we retry once before giving up.
    """
    for attempt in range(2):
        try:
            info = stock.info

            if info:
                return info

        except Exception:
            if attempt == 0:
                time.sleep(1)

    return {}


def _get_fast_info_safely(stock):
    """
    Safely retrieve Yahoo Finance fast market information.
    """
    try:
        return stock.fast_info
    except Exception:
        return None


def fetch_stock_data(ticker: str):
    ticker = ticker.upper().strip()

    stock = yf.Ticker(ticker)

    # Company metadata
    info = _get_info_safely(stock)

    # Fast market information
    fast_info = _get_fast_info_safely(stock)

    # ---------------------------------------------------------
    # Current Price
    # ---------------------------------------------------------

    current_price = None

    if fast_info is not None:
        try:
            current_price = fast_info.get("last_price")
        except Exception:
            current_price = None

    if current_price is None:
        current_price = info.get("currentPrice")

    # Final fallback: recent historical close
    if current_price is None:
        try:
            history = stock.history(period="5d")

            if not history.empty:
                current_price = float(
                    history["Close"].dropna().iloc[-1]
                )

        except Exception:
            current_price = None

    # ---------------------------------------------------------
    # Currency
    # ---------------------------------------------------------

    currency = info.get("currency")

    if not currency and fast_info is not None:
        try:
            currency = fast_info.get("currency")
        except Exception:
            currency = None

    currency = currency or "USD"

    # ---------------------------------------------------------
    # Market Cap
    # ---------------------------------------------------------

    market_cap = info.get("marketCap")

    if market_cap is None and fast_info is not None:
        try:
            market_cap = fast_info.get("market_cap")
        except Exception:
            market_cap = None

    # ---------------------------------------------------------
    # 52 Week High / Low
    # ---------------------------------------------------------

    fifty_two_week_high = info.get("fiftyTwoWeekHigh")

    if fifty_two_week_high is None and fast_info is not None:
        try:
            fifty_two_week_high = fast_info.get(
                "year_high"
            )
        except Exception:
            fifty_two_week_high = None

    fifty_two_week_low = info.get("fiftyTwoWeekLow")

    if fifty_two_week_low is None and fast_info is not None:
        try:
            fifty_two_week_low = fast_info.get(
                "year_low"
            )
        except Exception:
            fifty_two_week_low = None

    # ---------------------------------------------------------
    # Company Name
    # ---------------------------------------------------------

    company = (
        info.get("longName")
        or info.get("shortName")
        or ticker
    )

    # ---------------------------------------------------------
    # Return Stock Data
    # ---------------------------------------------------------

    return {
        "ticker": ticker,
        "company": company,

        "current_price": (
            round(float(current_price), 2)
            if current_price is not None
            else None
        ),

        "currency": currency,

        "sector": info.get("sector"),
        "industry": info.get("industry"),
        "country": info.get("country"),

        "employees": info.get("fullTimeEmployees"),

        "market_cap": market_cap,

        "pe_ratio": info.get("trailingPE"),

        "fifty_two_week_high": (
            round(float(fifty_two_week_high), 2)
            if fifty_two_week_high is not None
            else None
        ),

        "fifty_two_week_low": (
            round(float(fifty_two_week_low), 2)
            if fifty_two_week_low is not None
            else None
        ),
    }


def fetch_stock_history(ticker: str, period: str = "1mo"):
    ticker = ticker.upper().strip()

    stock = yf.Ticker(ticker)

    history = stock.history(period=period)

    data = []

    for date, row in history.iterrows():
        data.append(
            {
                "date": date.strftime("%Y-%m-%d"),
                "open": round(float(row["Open"]), 2),
                "high": round(float(row["High"]), 2),
                "low": round(float(row["Low"]), 2),
                "close": round(float(row["Close"]), 2),
                "volume": int(row["Volume"]),
            }
        )

    return data


def fetch_sma(
    ticker: str,
    period: str = "3mo",
    window: int = 20,
):
    ticker = ticker.upper().strip()

    stock = yf.Ticker(ticker)

    history = stock.history(period=period)

    if history.empty:
        return []

    history["SMA"] = (
        history["Close"]
        .rolling(window=window)
        .mean()
    )

    data = []

    for date, row in history.iterrows():

        if pd.isna(row["SMA"]):
            continue

        data.append(
            {
                "date": date.strftime("%Y-%m-%d"),
                "close": round(float(row["Close"]), 2),
                "sma": round(float(row["SMA"]), 2),
            }
        )

    return data