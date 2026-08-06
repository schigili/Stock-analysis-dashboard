import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface HistoryData {
  date: string;
  close: number;
  sma?: number;
}

interface StockChartProps {
  data: HistoryData[];
  showSMA?: boolean;
}

function StockChart({
  data,
  showSMA = false,
}: StockChartProps) {
  return (
    <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-xl">
      <h2 className="mb-5 text-2xl font-bold text-white">
        📈 Price Chart
      </h2>

      <ResponsiveContainer width="100%" height={420}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#475569"
          />

          <XAxis
            dataKey="date"
            stroke="#CBD5E1"
          />

          <YAxis
            stroke="#CBD5E1"
          />

          <Tooltip />

          <Legend />

          {/* Price */}
          <Line
            type="monotone"
            dataKey="close"
            name="Price"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={false}
          />

          {/* SMA */}
          {showSMA && (
            <Line
              type="monotone"
              dataKey="sma"
              name="SMA 20"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StockChart;