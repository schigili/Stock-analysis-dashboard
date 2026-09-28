import { useEffect, useState } from "react";

import type { StockResponse } from "../types/stock";
import type { HistoryData } from "../types/history";

import {
  getStock,
  getHistory,
  getSMA,
} from "../services/stockService";

export function useStockData(ticker: string) {
  const [stock, setStock] = useState<StockResponse | null>(null);
  const [history, setHistory] = useState<HistoryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticker) return;

    let isCancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const [stockResult, historyResult, smaResult] =
          await Promise.allSettled([
            getStock(ticker),
            getHistory(ticker),
            getSMA(ticker),
          ]);

        if (isCancelled) return;

        if (stockResult.status === "fulfilled" && stockResult.value) {
          setStock(stockResult.value);
        } else {
          console.error(
            "Error fetching stock data:",
            stockResult.status === "rejected" ? stockResult.reason : "Empty response"
          );
          setStock(null);
          setError(`Unable to load stock data for "${ticker}".`);
        }

        const historyData: HistoryData[] =
          historyResult.status === "fulfilled" && Array.isArray(historyResult.value)
            ? historyResult.value
            : [];

        const smaData: { date: string; sma: number }[] =
          smaResult.status === "fulfilled" && Array.isArray(smaResult.value)
            ? smaResult.value
            : [];

        const mergedHistory: HistoryData[] = historyData.map(
          (day: HistoryData) => {
            const sma = smaData.find(
              (item: { date: string; sma: number }) =>
                item.date === day.date
            );

            return {
              ...day,
              sma: sma?.sma,
            };
          }
        );

        setHistory(mergedHistory);
      } catch (err) {
        if (isCancelled) return;
        console.error("Error fetching stock data:", err);
        setStock(null);
        setHistory([]);
        setError(`Unable to load stock data for "${ticker}".`);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [ticker]);

  return {
    stock,
    history,
    loading,
    error,
  };
}