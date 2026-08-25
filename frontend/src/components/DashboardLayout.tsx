import type { ReactNode } from "react";

interface DashboardLayoutProps {
  watchlist: ReactNode;
  search: ReactNode;
  stockCard: ReactNode;
  chart: ReactNode;
}

function DashboardLayout({
  watchlist,
  search,
  stockCard,
  chart,
}: DashboardLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020817] text-white">

      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        <div
          className="absolute -inset-10 bg-cover bg-center"
          style={{
            backgroundImage: "url('/market-background.png')",
            animation: "marketBackground 25s ease-in-out infinite alternate",
          }}
        />

        <div className="absolute inset-0 bg-[#020817]/80" />

        <div className="absolute -left-40 top-32 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="absolute bottom-0 left-1/3 h-[400px] w-[600px] rounded-full bg-purple-600/10 blur-[150px]" />

      </div>

      {/* ================= NAVBAR ================= */}

      <header className="relative z-20 border-b border-white/10 bg-[#020817]/75 backdrop-blur-xl">

        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-8">

          {/* LOGO */}

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-blue-500/30">

              <svg
                viewBox="0 0 48 48"
                className="h-7 w-7 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M5 34L15 24L21 29L34 13L43 7" />
                <path d="M32 7H43V18" />
              </svg>

            </div>

            <div>

              <h1 className="text-2xl font-black tracking-tight">
                Fin<span className="text-cyan-400">Vue</span>
              </h1>

              <p className="text-[9px] font-medium tracking-[0.2em] text-slate-500">
                TRADE SMARTER. SEE AHEAD.
              </p>

            </div>

          </div>

          {/* MARKET INDICES */}

          <div className="hidden items-center gap-8 lg:flex">

            <div>
              <p className="text-xs text-slate-500">
                S&P 500
              </p>

              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  5,604.14
                </span>

                <span className="text-xs text-green-400">
                  ▲ +0.85%
                </span>
              </div>
            </div>

            <div className="h-8 w-px bg-white/10" />

            <div>
              <p className="text-xs text-slate-500">
                NASDAQ
              </p>

              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  17,649.50
                </span>

                <span className="text-xs text-green-400">
                  ▲ +1.15%
                </span>
              </div>
            </div>

            <div className="h-8 w-px bg-white/10" />

            <div>
              <p className="text-xs text-slate-500">
                DOW JONES
              </p>

              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  39,872.99
                </span>

                <span className="text-xs text-red-400">
                  ▼ -0.23%
                </span>
              </div>
            </div>

          </div>

          {/* LIVE STATUS */}

          <div className="hidden items-center gap-3 md:flex">

            <div className="flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2">

              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

              <span className="text-xs font-semibold text-green-400">
                LIVE MARKET
              </span>

            </div>

          </div>

        </div>

      </header>

      {/* ================= MAIN ================= */}

      <main className="relative z-10">

        <div className="mx-auto max-w-[1500px] px-8 py-10">

          {/* HERO */}

          <section className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/35 px-8 py-10 shadow-2xl backdrop-blur-sm">

            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

            <div className="relative z-10">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20">

                  <svg
                    viewBox="0 0 48 48"
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M5 34L15 24L21 29L34 13L43 7" />
                    <path d="M32 7H43V18" />
                  </svg>

                </div>

                <span className="text-2xl font-black tracking-tight">
                  Fin<span className="text-cyan-400">Vue</span>
                </span>

              </div>

              <h2 className="max-w-5xl text-5xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">

                <span className="text-white">
                  Smarter Markets.
                </span>

                <br />

                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Better Decisions.
                </span>

              </h2>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
                Real-time market data, intelligent stock analysis,
                technical indicators, and financial news — all in one place.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <div className="flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-xs font-semibold text-green-400">

                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

                  Live Market Data

                </div>

                <div className="rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-semibold text-blue-300">
                  Technical Analysis
                </div>

                <div className="rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-xs font-semibold text-purple-300">
                  Market Intelligence
                </div>

              </div>

            </div>

          </section>

          {/* ================= DASHBOARD GRID ================= */}

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">

            {/* ================= SIDEBAR ================= */}

            <aside>

              <div className="sticky top-8 space-y-5">

                {/* WATCHLIST */}

                <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-1 shadow-2xl backdrop-blur-xl">

                  {watchlist}

                </div>

                {/* MARKET PULSE */}

                <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-5 shadow-2xl backdrop-blur-xl">

                  <div className="mb-5 flex items-center justify-between">

                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        Market
                      </p>

                      <h3 className="mt-1 text-lg font-bold">
                        Market Pulse
                      </h3>
                    </div>

                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400 shadow-lg shadow-green-400/50" />

                  </div>

                  <div className="space-y-4">

                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">
                        S&P 500
                      </span>

                      <span className="text-sm font-semibold text-green-400">
                        +0.85%
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">
                        NASDAQ
                      </span>

                      <span className="text-sm font-semibold text-green-400">
                        +1.15%
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">
                        Dow Jones
                      </span>

                      <span className="text-sm font-semibold text-red-400">
                        -0.23%
                      </span>
                    </div>

                  </div>

                  <div className="mt-5 h-16 overflow-hidden rounded-lg bg-slate-950/40">

                    <svg
                      viewBox="0 0 300 80"
                      className="h-full w-full"
                      preserveAspectRatio="none"
                    >

                      <path
                        d="M0 70 L20 65 L40 68 L60 55 L80 60 L100 45 L120 50 L140 38 L160 45 L180 30 L200 36 L220 25 L240 30 L260 15 L280 20 L300 5"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2"
                      />

                    </svg>

                  </div>

                </div>

                {/* MARKET MOVERS */}

                <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-5 shadow-2xl backdrop-blur-xl">

                  <div className="mb-5 flex items-center justify-between">

                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        Trending
                      </p>

                      <h3 className="mt-1 text-lg font-bold">
                        Market Movers
                      </h3>
                    </div>

                    <span className="text-xs text-slate-500">
                      Today
                    </span>

                  </div>

                  <div className="space-y-4">

                    <div className="flex items-center justify-between">

                      <div>
                        <p className="font-semibold text-white">
                          NVDA
                        </p>

                        <p className="text-xs text-slate-500">
                          NVIDIA
                        </p>
                      </div>

                      <span className="rounded-md bg-green-500/10 px-2 py-1 text-xs font-semibold text-green-400">
                        +3.42%
                      </span>

                    </div>

                    <div className="flex items-center justify-between">

                      <div>
                        <p className="font-semibold text-white">
                          TSLA
                        </p>

                        <p className="text-xs text-slate-500">
                          Tesla
                        </p>
                      </div>

                      <span className="rounded-md bg-green-500/10 px-2 py-1 text-xs font-semibold text-green-400">
                        +2.18%
                      </span>

                    </div>

                    <div className="flex items-center justify-between">

                      <div>
                        <p className="font-semibold text-white">
                          AAPL
                        </p>

                        <p className="text-xs text-slate-500">
                          Apple
                        </p>
                      </div>

                      <span className="rounded-md bg-red-500/10 px-2 py-1 text-xs font-semibold text-red-400">
                        -0.74%
                      </span>

                    </div>

                    <div className="flex items-center justify-between">

                      <div>
                        <p className="font-semibold text-white">
                          MSFT
                        </p>

                        <p className="text-xs text-slate-500">
                          Microsoft
                        </p>
                      </div>

                      <span className="rounded-md bg-green-500/10 px-2 py-1 text-xs font-semibold text-green-400">
                        +1.27%
                      </span>

                    </div>

                  </div>

                </div>

                {/* MARKET ACTIVITY */}

                <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-5 shadow-2xl backdrop-blur-xl">

                  <div className="mb-5">

                    <p className="text-xs uppercase tracking-widest text-slate-500">
                      Activity
                    </p>

                    <h3 className="mt-1 text-lg font-bold">
                      Market Activity
                    </h3>

                  </div>

                  <div className="space-y-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
                        ●
                      </div>

                      <div>
                        <p className="text-sm font-medium text-white">
                          Market connection
                        </p>

                        <p className="text-xs text-green-400">
                          Operational
                        </p>
                      </div>

                    </div>

                    <div className="flex items-center gap-3">

                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        ↻
                      </div>

                      <div>
                        <p className="text-sm font-medium text-white">
                          Data refresh
                        </p>

                        <p className="text-xs text-slate-500">
                          Live requests enabled
                        </p>
                      </div>

                    </div>

                    <div className="flex items-center gap-3">

                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                        ◈
                      </div>

                      <div>
                        <p className="text-sm font-medium text-white">
                          Technical analysis
                        </p>

                        <p className="text-xs text-slate-500">
                          SMA 20 active
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

                {/* PLATFORM */}

                <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-5 shadow-xl backdrop-blur-xl">

                  <p className="text-xs uppercase tracking-widest text-slate-500">
                    Platform
                  </p>

                  <h3 className="mt-1 text-lg font-bold">
                    FinVue
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    Market data, technical analysis, watchlists,
                    and financial news in one intelligent dashboard.
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs text-green-400">

                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

                    Data connection active

                  </div>

                </div>

              </div>

            </aside>

            {/* ================= MAIN DASHBOARD ================= */}

            <div className="min-w-0">

              {/* SEARCH */}

              <section className="mb-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-2xl backdrop-blur-xl">

                {search}

              </section>

              {/* STOCK CARD */}

              <section className="mb-6">

                {stockCard}

              </section>

              {/* CHART */}

              <section>

                {chart}

              </section>

            </div>

          </div>

        </div>

      </main>

      {/* ================= FOOTER ================= */}

      <footer className="relative z-10 border-t border-white/10 bg-[#020817]/85 backdrop-blur-xl">

        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-8 py-5">

          <div className="flex items-center gap-2 text-xs text-slate-500">

            <span className="h-2 w-2 rounded-full bg-green-400" />

            Market data connection active

          </div>

          <p className="text-xs text-slate-600">
            FinVue • Smarter Markets. Better Decisions.
          </p>

        </div>

      </footer>

      {/* ================= ANIMATION ================= */}

      <style>{`
        @keyframes marketBackground {
          0% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.035) translateX(-0.5%);
          }

          100% {
            transform: scale(1.07) translateX(0.5%);
          }
        }
      `}</style>

    </div>
  );
}

export default DashboardLayout;