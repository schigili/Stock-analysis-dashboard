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
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto flex max-w-7xl gap-6 p-6">

        {/* Left Sidebar */}
        <aside className="w-72 flex-shrink-0">
          {watchlist}
        </aside>

        {/* Main Content */}
        <main className="flex-1">

          <div className="mb-6">
            {search}
          </div>

          <div className="mb-6">
            {stockCard}
          </div>

          <div>
            {chart}
          </div>

        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;