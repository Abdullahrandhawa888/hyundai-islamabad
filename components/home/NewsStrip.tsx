import Image from "next/image";
import Link from "next/link";
import { news } from "@/lib/data";

export function NewsStrip() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.18em] text-muted uppercase">
            Latest news
          </p>
          <h2 className="mt-2 text-3xl font-light">News & Events</h2>
        </div>
        <Link
          href="/news"
          className="text-[13px] font-semibold transition-colors duration-300 ease-out hover:text-accent"
        >
          Read More News
        </Link>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {news.map((article) => (
          <Link key={article.slug} href={`/news/${article.slug}`} className="group">
            <div className="relative mb-4 aspect-[3/2] overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <p className="text-[11px] tracking-wide text-muted uppercase">{article.date}</p>
            <h3 className="mt-2 text-[15px] leading-6 font-medium transition-colors duration-300 ease-out group-hover:text-accent">
              {article.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
