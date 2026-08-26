# 📈 FinVue

### Smarter Markets. Better Decisions.

FinVue is a full-stack stock analysis dashboard that provides market data, technical analysis, stock history, watchlists, and financial news through a modern interactive interface.

🔗 **Live Demo:** https://finvue-eta.vercel.app

---

## 🚀 Features

### 📊 Stock Analysis
- Search stocks by ticker symbol or company name
- Real-time stock information
- Current market price
- Market capitalization
- P/E ratio
- 52-week high and low
- Company sector and industry
- Employee information

### 📈 Technical Analysis
- Historical stock price data
- Interactive stock charts
- Simple Moving Average (SMA)
- Configurable SMA window
- Historical market trends

### 📰 Financial News
- Latest financial news for selected stocks
- Publisher information
- Direct links to original articles
- Live market-news section

### ⭐ Watchlist
- Add stocks to your personal watchlist
- Remove stocks from the watchlist
- Quickly switch between tracked stocks

### 🔎 Intelligent Stock Search
- Search by ticker symbol
- Search by company name
- Autocomplete suggestions
- Select stocks directly from search results

### 🎨 Modern Dashboard
- FinVue branded interface
- Dark financial-dashboard theme
- Responsive layout
- Market-chart background
- Live data indicators
- Clean card-based UI

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Recharts

### Backend

- Python
- FastAPI
- Uvicorn
- Pandas
- yfinance

### Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Source Control:** GitHub

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │       FinVue         │
                    │   React + Vite UI    │
                    │      Vercel          │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │     FastAPI API      │
                    │       Render         │
                    └──────────┬───────────┘
                               │
                 ┌─────────────┼─────────────┐
                 │             │             │
                 ▼             ▼             ▼
             yfinance       Pandas       News API
                 │             │             │
                 └─────────────┼─────────────┘
                               │
                               ▼
                       Market Information