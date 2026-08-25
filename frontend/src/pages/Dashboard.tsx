import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import DashboardLayout from "../components/DashboardLayout";
import SearchBar from "../components/SearchBar";
import StockCard from "../components/StockCard";
import StockChart from "../components/StockChart";
import Watchlist from "../components/Watchlist";
import News from "../components/News";

import { searchStocks, getStockNews } from "../services/stockService";
import { useStockData } from "../hooks/useStockData";

import type { SearchResult } from "../types/search";
import type { NewsArticle } from "../types/news";

function Dashboard() {
  const [input, setInput] = useState("AAPL");
  const [ticker, setTicker] = useState("AAPL");

  const { stock, history, loading } = useStockData(ticker);

  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);

  const [watchlist, setWatchlist] = useState<string[]>(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Debounced search
  useEffect(() => {
    if (input.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const data = await searchStocks(input);
        setSuggestions(data);
      } catch (error) {
        console.error("Search error:", error);
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [input]);

  // Fetch news only when selected ticker changes
  useEffect(() => {
    async function fetchNews() {
      try {
        const data = await getStockNews(ticker);
        setNews(data);
      } catch (error) {
        console.error("News error:", error);
        setNews([]);
      }
    }

    fetchNews();
  }, [ticker]);

  function handleSearch() {
    const symbol = input.trim().toUpperCase();

    if (!symbol) return;

    setTicker(symbol);
    setSuggestions([]);
  }

  function addToWatchlist() {
    if (!ticker) return;

    if (!watchlist.includes(ticker)) {
      setWatchlist([...watchlist, ticker]);
    }
  }

  function removeFromWatchlist(symbol: string) {
    setWatchlist(
      watchlist.filter((item) => item !== symbol)
    );
  }

  return (
    <>
      <Navbar />

      <DashboardLayout
        watchlist={
          <Watchlist
            stocks={watchlist}
            onSelect={(symbol) => {
              setInput(symbol);
              setTicker(symbol);
              setSuggestions([]);
            }}
            onRemove={removeFromWatchlist}
          />
        }

        search={
          <>
            <SearchBar
              input={input}
              setInput={setInput}
              onSearch={handleSearch}
              suggestions={suggestions}
              onSelect={(symbol) => {
                setInput(symbol);
                setTicker(symbol);
                setSuggestions([]);
              }}
              onClose={() => setSuggestions([])}
            />

            <div className="mt-4 flex justify-center">
              <button
                onClick={addToWatchlist}
                className="rounded-lg bg-yellow-500 px-5 py-2 font-semibold text-black transition hover:bg-yellow-400"
              >
                ⭐ Add to Watchlist
              </button>
            </div>
          </>
        }

        stockCard={
          loading ? (
            <div className="rounded-xl bg-slate-800 p-8 text-center text-white">
              Loading...
            </div>
          ) : stock ? (
            <StockCard stock={stock} />
          ) : null
        }

        chart={
          history.length > 0 ? (
            <StockChart
              data={history}
              showSMA={true}
            />
          ) : null
        }
      />

      <div className="mx-auto max-w-[1500px] px-8 pb-10">
        <News articles={news} />
      </div>
    </>
  );
}

export default Dashboard;