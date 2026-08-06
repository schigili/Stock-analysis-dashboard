import type { StockResponse } from "../types/stock";

interface StockCardProps {
  stock: StockResponse;
}

function formatMarketCap(value: number | null) {
  if (!value) return "N/A";

  if (value >= 1_000_000_000_000)
    return `$${(value / 1_000_000_000_000).toFixed(2)}T`;

  if (value >= 1_000_000_000)
    return `$${(value / 1_000_000_000).toFixed(2)}B`;

  if (value >= 1_000_000)
    return `$${(value / 1_000_000).toFixed(2)}M`;

  return `$${value.toLocaleString()}`;
}

function MetricCard({
  title,
  value,
  color = "text-white",
}: {
  title: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="rounded-xl bg-slate-800 border border-slate-700 p-5 shadow-lg hover:border-blue-500 transition">
      <p className="text-sm text-slate-400">{title}</p>

      <p className={`mt-2 text-2xl font-bold ${color}`}>
        {value}
      </p>
    </div>
  );
}

function StockCard({ stock }: StockCardProps) {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-xl">

        <h1 className="text-4xl font-bold text-white">
          {stock.company}
        </h1>

        <p className="mt-2 text-lg text-slate-400">
          {stock.ticker}
        </p>

      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">

        <MetricCard
          title="Current Price"
          value={`$${stock.current_price ?? "N/A"}`}
          color="text-green-400"
        />

        <MetricCard
          title="Market Cap"
          value={formatMarketCap(stock.market_cap)}
        />

        <MetricCard
          title="P/E Ratio"
          value={stock.pe_ratio?.toFixed(2) ?? "N/A"}
        />

        <MetricCard
          title="Employees"
          value={
            stock.employees?.toLocaleString() ?? "N/A"
          }
        />

        <MetricCard
          title="Sector"
          value={stock.sector ?? "N/A"}
        />

        <MetricCard
          title="Industry"
          value={stock.industry ?? "N/A"}
        />

        <MetricCard
          title="52W High"
          value={`$${stock.fifty_two_week_high ?? "N/A"}`}
          color="text-green-400"
        />

        <MetricCard
          title="52W Low"
          value={`$${stock.fifty_two_week_low ?? "N/A"}`}
          color="text-red-400"
        />

      </div>

      {/* Company Details */}

      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-xl">

        <h2 className="mb-4 text-xl font-semibold text-white">
          Company Information
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <p className="text-slate-400">Country</p>

            <p className="font-semibold text-white">
              {stock.country ?? "N/A"}
            </p>
          </div>

          <div>
            <p className="text-slate-400">Currency</p>

            <p className="font-semibold text-white">
              {stock.currency ?? "N/A"}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default StockCard;