import { useEffect, useRef } from "react";
import type { SearchResult } from "../types/search";

interface SearchBarProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
  suggestions: SearchResult[];
  onSelect: (symbol: string) => void;
  onClose: () => void;
}

function SearchBar({
  input,
  setInput,
  onSearch,
  suggestions,
  onSelect,
  onClose,
}: SearchBarProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="mt-10 flex justify-center">
      <div
        ref={wrapperRef}
        className="relative w-96"
      >
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search company or ticker..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          <button
            onClick={onSearch}
            className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {suggestions.length > 0 && (
          <div className="absolute z-50 mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 shadow-xl">
            {suggestions.map((item) => (
              <button
                key={item.symbol}
                onClick={() => onSelect(item.symbol)}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-white hover:bg-slate-700"
              >
                <span>{item.name}</span>

                <span className="font-semibold text-blue-400">
                  {item.symbol}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;