import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import DashboardLayout from "../components/DashboardLayout";
import SearchBar from "../components/SearchBar";
import StockCard from "../components/StockCard";
import StockChart from "../components/StockChart";
import Watchlist from "../components/Watchlist";

import { searchStocks } from "../services/stockService";
import { useStockData } from "../hooks/useStockData";

import type { SearchResult } from "../types/search";

function Dashboard() {
  const [input, setInput] = useState("AAPL");
  const [ticker, setTicker] = useState("AAPL");

  const { stock, history, loading } = useStockData(ticker);

  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);

  const [watchlist, setWatchlist] = useState<string[]>(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    async function fetchSuggestions() {
      if (input.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const data = await searchStocks(input);
        setSuggestions(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSuggestions();
  }, [input]);

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
            }}
            onRemove={removeFromWatchlist}
          />
        }
        search={
          <>
            <SearchBar
              input={input}
              setInput={setInput}
              onSearch={() => setTicker(input)}
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
                className="rounded-lg bg-yellow-500 px-5 py-2 font-semibold text-black hover:bg-yellow-400 transition"
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
    </>
  );
}

export default Dashboard;