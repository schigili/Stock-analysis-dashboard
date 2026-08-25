import type { NewsArticle } from "../types/News";

interface NewsProps {
  articles: NewsArticle[];
}

function News({ articles }: NewsProps) {
  if (!articles || articles.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-6 shadow-2xl backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-white">
          📰 Latest News
        </h2>

        <p className="mt-4 text-sm text-slate-400">
          No news available for this stock right now.
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/75 p-6 shadow-2xl backdrop-blur-xl">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
            Market Intelligence
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            📰 Latest News
          </h2>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1.5">

          <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

          <span className="text-xs font-medium text-green-400">
            Live
          </span>

        </div>

      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

        {articles.map((article, index) => {

          const articleLink = article.link ?? "#";

          return (
            <a
              key={`${articleLink}-${index}`}
              href={articleLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-white/10 bg-slate-950/50 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-slate-900"
            >

              <div className="mb-4 flex items-center justify-between">

                <span className="rounded-md bg-cyan-400/10 px-2.5 py-1 text-xs font-medium text-cyan-400">
                  {article.publisher ?? "Financial News"}
                </span>

                <span className="text-slate-600 transition group-hover:text-cyan-400">
                  ↗
                </span>

              </div>

              <h3 className="line-clamp-3 text-base font-semibold leading-relaxed text-white transition group-hover:text-cyan-300">
                {article.title}
              </h3>

              <div className="mt-5 flex items-center justify-between">

                <span className="text-xs text-slate-500">
                  Financial Markets
                </span>

                <span className="text-xs font-medium text-slate-400 transition group-hover:text-cyan-400">
                  Read article →
                </span>

              </div>

            </a>
          );
        })}

      </div>

    </section>
  );
}

export default News;