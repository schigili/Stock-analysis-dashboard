import api from "./api";

export async function getStock(ticker: string) {
  const response = await api.get(`/stock/${ticker}`);
  return response.data;
}

export async function getHistory(ticker: string) {
  const response = await api.get(`/stock/${ticker}/history`);
  return response.data;
}

export async function getSMA(ticker: string) {
  const response = await api.get(`/stock/${ticker}/sma`);
  return response.data;
}

export async function searchStocks(query: string) {
  const response = await api.get(`/stock/search?query=${query}`);
  return response.data;
}