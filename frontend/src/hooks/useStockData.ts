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
    async function fetchData() {
      setLoading(true);

      try {
        const stockData = await getStock(ticker);
        const historyData = await getHistory(ticker);
        const smaData = await getSMA(ticker);

        const mergedHistory = historyData.map((day: HistoryData) => {
          const sma = smaData.find(
            (item: any) => item.date === day.date
          );

          return {
            ...day,
            sma: sma?.sma,
          };
        });

        setStock(stockData);
        setHistory(mergedHistory);

      } catch (error) {
        console.error(error);
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