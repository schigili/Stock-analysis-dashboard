import requests


def search_companies(query: str):
    url = "https://query2.finance.yahoo.com/v1/finance/search"

    params = {
        "q": query,
        "quotesCount": 8,
        "newsCount": 0,
    }

    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    response = requests.get(url, params=params, headers=headers)
    response.raise_for_status()

    data = response.json()

    results = []

    for item in data.get("quotes", []):
        symbol = item.get("symbol")
        name = item.get("shortname") or item.get("longname")

        if symbol and name:
            results.append({
                "symbol": symbol,
                "name": name
            })

    return results