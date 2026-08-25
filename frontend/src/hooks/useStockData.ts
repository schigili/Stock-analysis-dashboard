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

  useEffect(() => {
    if (!ticker) return;

    async function fetchData() {
      setLoading(true);

      try {
        const [stockData, historyData, smaData] =
          await Promise.all([
            getStock(ticker),
            getHistory(ticker),
            getSMA(ticker),
          ]);

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

        setStock(stockData);
        setHistory(mergedHistory);

      } catch (error) {
        console.error("Error fetching stock data:", error);
        setStock(null);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [ticker]);

  return {
    stock,
    history,
    loading,
  };
}