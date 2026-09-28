import os
import time

import pandas as pd
import requests
import yfinance as yf
from dotenv import load_dotenv


load_dotenv()

ALPHA_VANTAGE_API_KEY = os.getenv("ALPHA_VANTAGE_API_KEY")
ALPHA_VANTAGE_URL = "https://www.alphavantage.co/query"


def fetch_alpha_vantage_overview(ticker: str):
    """
    Fetch company fundamentals from Alpha Vantage.
    Returns an empty dictionary if the request fails.
    """

    if not ALPHA_VANTAGE_API_KEY:
        return {}

    try:
        response = requests.get(
            ALPHA_VANTAGE_URL,
            params={
                "function": "OVERVIEW",
                "symbol": ticker,
                "apikey": ALPHA_VANTAGE_API_KEY,
            },
            timeout=15,
        )

        if response.status_code != 200:
            return {}

        data = response.json()

        # Alpha Vantage may return an error/note instead of company data.
        if not data or "Symbol" not in data:
            return {}

        return data

    except Exception:
        return {}


def safe_float(value):
    """
    Convert a value to float safely.
    """
    try:
        if value is None:
            return None

        if isinstance(value, str):
            value = value.strip()

            if value in ("", "None", "null", "N/A", "-"):
                return None

        return float(value)

    except (ValueError, TypeError):
        return None


def safe_int(value):
    """
    Convert a value to integer safely.
    """
    try:
        if value is None:
            return None

        if isinstance(value, str):
            value = value.strip()

            if value in ("", "None", "null", "N/A", "-"):
                return None

        return int(float(value))

    except (ValueError, TypeError):
        return None


def _get_yfinance_info(stock):
    """
    Safely retrieve Yahoo Finance metadata.
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


def _get_fast_info(stock):
    """
    Safely retrieve Yahoo Finance fast market data.
    """
    try:
        return stock.fast_info
    except Exception:
        return None


def fetch_stock_data(ticker: str):
    ticker = ticker.upper().strip()

    stock = yf.Ticker(ticker)

    # ---------------------------------------------------------
    # Yahoo Finance data
    # ---------------------------------------------------------

    yahoo_info = _get_yfinance_info(stock)
    fast_info = _get_fast_info(stock)

    # ---------------------------------------------------------
    # Alpha Vantage fundamentals
    # ---------------------------------------------------------

    alpha_info = fetch_alpha_vantage_overview(ticker)

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
        current_price = yahoo_info.get("currentPrice")

    if current_price is None:
        current_price = safe_float(
            alpha_info.get("Price")
        )

    # Final fallback to historical data
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
    # Company
    # ---------------------------------------------------------

    company = (
        alpha_info.get("Name")
        or yahoo_info.get("longName")
        or yahoo_info.get("shortName")
        or ticker
    )

    # ---------------------------------------------------------
    # Currency
    # ---------------------------------------------------------

    currency = (
        alpha_info.get("Currency")
        or yahoo_info.get("currency")
        or "USD"
    )

    # ---------------------------------------------------------
    # Sector
    # ---------------------------------------------------------

    sector = (
        alpha_info.get("Sector")
        or yahoo_info.get("sector")
    )

    # ---------------------------------------------------------
    # Industry
    # ---------------------------------------------------------

    industry = (
        alpha_info.get("Industry")
        or yahoo_info.get("industry")
    )

    # ---------------------------------------------------------
    # Country
    # ---------------------------------------------------------

    country = (
        alpha_info.get("Country")
        or yahoo_info.get("country")
    )

    # ---------------------------------------------------------
    # Employees
    # ---------------------------------------------------------

    employees = safe_int(
        alpha_info.get("FullTimeEmployees")
    )

    if employees is None:
        employees = safe_int(
            yahoo_info.get("fullTimeEmployees")
        )

    # ---------------------------------------------------------
    # Market Cap
    # ---------------------------------------------------------

    market_cap = safe_int(
        alpha_info.get("MarketCapitalization")
    )

    if market_cap is None:
        market_cap = safe_int(
            yahoo_info.get("marketCap")
        )

    if market_cap is None and fast_info is not None:
        try:
            market_cap = safe_int(
                fast_info.get("market_cap")
                if hasattr(fast_info, "get")
                else getattr(fast_info, "market_cap", None)
            )
        except Exception:
            pass

    # ---------------------------------------------------------
    # P/E Ratio
    # ---------------------------------------------------------

    pe_ratio = safe_float(
        alpha_info.get("PERatio")
    )

    if pe_ratio is None:
        pe_ratio = safe_float(
            yahoo_info.get("trailingPE")
        )

    # ---------------------------------------------------------
    # 52 Week High
    # ---------------------------------------------------------

    fifty_two_week_high = safe_float(
        alpha_info.get("52WeekHigh")
    )

    if fifty_two_week_high is None:
        fifty_two_week_high = safe_float(
            yahoo_info.get("fiftyTwoWeekHigh")
        )

    if fifty_two_week_high is None and fast_info is not None:
        try:
            fifty_two_week_high = safe_float(
                fast_info.get("year_high")
            )
        except Exception:
            pass

    # ---------------------------------------------------------
    # 52 Week Low
    # ---------------------------------------------------------

    fifty_two_week_low = safe_float(
        alpha_info.get("52WeekLow")
    )

    if fifty_two_week_low is None:
        fifty_two_week_low = safe_float(
            yahoo_info.get("fiftyTwoWeekLow")
        )

    if fifty_two_week_low is None and fast_info is not None:
        try:
            fifty_two_week_low = safe_float(
                fast_info.get("year_low")
            )
        except Exception:
            pass

    # ---------------------------------------------------------
    # Return final response
    # ---------------------------------------------------------

    return {
        "ticker": ticker,
        "company": company,

        "current_price": (
            round(current_price, 2)
            if current_price is not None
            else None
        ),

        "currency": currency,

        "sector": sector,
        "industry": industry,
        "country": country,

        "employees": employees,

        "market_cap": market_cap,

        "pe_ratio": pe_ratio,

        "fifty_two_week_high": (
            round(fifty_two_week_high, 2)
            if fifty_two_week_high is not None
            else None
        ),

        "fifty_two_week_low": (
            round(fifty_two_week_low, 2)
            if fifty_two_week_low is not None
            else None
        ),
    }


def fetch_stock_history(
    ticker: str,
    period: str = "1mo"
):
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