import type { NewsArticle } from "../types/News";

interface NewsProps {
  articles: NewsArticle[];
}

function News({ articles }: NewsProps) {
  return (
    <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-xl">
      <h2 className="mb-5 text-2xl font-bold text-white">
        📰 Latest News
      </h2>

      {articles.length === 0 ? (
        <p className="text-slate-400">
          No news available.
        </p>
      ) : (
        <div className="space-y-4">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl bg-slate-700 p-4 transition hover:bg-slate-600"
            >
              <h3 className="font-semibold text-white">
                {article.title}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {article.publisher}
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default News;