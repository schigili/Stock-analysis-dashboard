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
    <div className="relative min-h-screen overflow-hidden bg-slate-950">

      {/* Subtle market background */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.06]">

        <svg
          className="absolute left-0 top-0 h-full w-full"
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
        >
          <path
            d="M0 700 L100 650 L180 690 L270 570 L350 620 L450 470 L540 530 L630 420 L720 470 L820 330 L910 390 L1010 270 L1100 340 L1200 220 L1300 280 L1400 170 L1500 230 L1600 120"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
          />

          <path
            d="M0 780 L120 740 L220 760 L320 680 L420 720 L520 620 L620 650 L720 560 L820 600 L920 500 L1020 540 L1120 430 L1220 480 L1320 360 L1420 410 L1520 300 L1600 340"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
          />
        </svg>

      </div>

      {/* Main content */}
      <div className="relative z-10">

        <div className="mx-auto flex max-w-[1500px] gap-8 px-8 py-8">

          {/* LEFT SIDEBAR */}
          <aside className="w-64 shrink-0">
            <div className="sticky top-8 space-y-5">

              {watchlist}

              {/* Market Snapshot */}
              <div className="rounded-2xl border border-slate-700 bg-slate-800 p-5 shadow-xl">

                <h3 className="mb-4 text-lg font-bold text-white">
                  📊 Market Snapshot
                </h3>

                <div className="space-y-4">

                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">
                      Market
                    </span>

                    <span className="flex items-center gap-2 text-sm font-semibold text-green-400">
                      <span className="h-2 w-2 rounded-full bg-green-400" />
                      Active
                    </span>
                  </div>

                  <div className="border-t border-slate-700" />

                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">
                      Data
                    </span>

                    <span className="text-sm text-white">
                      Yahoo Finance
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">
                      History
                    </span>

                    <span className="text-sm text-blue-400">
                      1 Month
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">
                      Indicator
                    </span>

                    <span className="text-sm text-yellow-400">
                      SMA 20
                    </span>
                  </div>

                </div>
              </div>

              {/* Project Info */}
              <div className="rounded-2xl border border-slate-700 bg-slate-800 p-5 shadow-xl">

                <h3 className="mb-4 text-lg font-bold text-white">
                  ⚡ Quick Info
                </h3>

                <div className="space-y-3 text-sm">

                  <div className="flex justify-between">
                    <span className="text-slate-400">
                      Search
                    </span>

                    <span className="text-green-400">
                      Live
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">
                      Watchlist
                    </span>

                    <span className="text-white">
                      Local
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">
                      Analysis
                    </span>

                    <span className="text-blue-400">
                      SMA
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">
                      Backend
                    </span>

                    <span className="text-purple-400">
                      FastAPI
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="min-w-0 flex-1">

            <section className="mb-6">
              {search}
            </section>

            <section className="mb-6">
              {stockCard}
            </section>

            <section>
              {chart}
            </section>

          </main>

        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;