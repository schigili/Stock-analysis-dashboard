export interface HistoryData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;

  // Technical Indicators
  sma?: number;
}