import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { news } from "@/lib/data";

export const metadata: Metadata = {
  title: "News & Events",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        title="News & Events"
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "News & Events" },
        ]}
        image="/images/news/elantra-launch.jpg"
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <p className="text-[14px] text-muted">
          Stay informed, stay ahead: latest news and expert tips from Hyundai Islamabad.
        </p>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {news.map((article) => (
            <Link key={article.slug} href={`/news/${article.slug}`} className="group">
              <div className="relative mb-4 aspect-[16/9] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-[12px] text-muted">{article.date}</p>
              <h2 className="mt-2 text-xl font-light group-hover:text-accent">{article.title}</h2>
              <p className="mt-3 text-[14px] leading-7 text-muted">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
