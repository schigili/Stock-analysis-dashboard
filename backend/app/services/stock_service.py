import yfinance as yf
import pandas as pd


def fetch_stock_data(ticker: str):
    stock = yf.Ticker(ticker.upper())
    info = stock.info

    return {
        "ticker": ticker.upper(),
        "company": info.get("longName"),
        "current_price": info.get("currentPrice"),
        "currency": info.get("currency"),
        "sector": info.get("sector"),
    }


def fetch_stock_history(ticker: str, period: str = "1mo"):
    stock = yf.Ticker(ticker.upper())

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
    stock = yf.Ticker(ticker.upper())

    history = stock.history(period=period)

    print(history.head())
    print(history.tail())
    print("Rows:", len(history))

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

    print("SMA rows:", len(data))

    return data