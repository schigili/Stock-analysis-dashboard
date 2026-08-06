interface WatchlistProps {
  stocks: string[];
  onSelect: (ticker: string) => void;
  onRemove: (ticker: string) => void;
}

function Watchlist({
  stocks,
  onSelect,
  onRemove,
}: WatchlistProps) {
  return (
    <div className="rounded-2xl bg-slate-800 p-5 shadow-xl border border-slate-700">
      <h2 className="mb-5 text-2xl font-bold text-white">
        ⭐ Watchlist
      </h2>

      {stocks.length === 0 ? (
        <p className="text-slate-400">
          No stocks added.
        </p>
      ) : (
        <div className="space-y-3">
          {stocks.map((ticker) => (
            <div
              key={ticker}
              className="flex items-center gap-2"
            >
              <button
                onClick={() => onSelect(ticker)}
                className="flex-1 rounded-lg bg-slate-700 px-4 py-3 text-left font-medium text-white transition hover:bg-blue-600"
              >
                {ticker}
              </button>

              <button
                onClick={() => onRemove(ticker)}
                className="rounded-lg bg-red-600 px-3 py-3 text-white transition hover:bg-red-700"
                title="Remove"
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;