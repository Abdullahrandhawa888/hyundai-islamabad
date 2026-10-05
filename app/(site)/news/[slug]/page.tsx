import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/shared/PageHero";
import { getNews, news } from "@/lib/data";

export function generateStaticParams() {
  return news.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getNews(slug);
  return { title: article?.title ?? "News" };
}

export default async function NewsArticlePage({
  params,
}: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const article = getNews(slug);
  if (!article) notFound();

  return (
    <>
      <PageHero
        title={article.title}
        crumbs={[
          { label: "Homepage", href: "/" },
          { label: "News & Events", href: "/news" },
          { label: article.title },
        ]}
        image={article.image}
      />
      <article className="mx-auto max-w-3xl px-5 py-14 md:px-8">
        <p className="text-[13px] text-muted">
          {article.date} · {article.author}
        </p>
        <div className="relative mt-6 aspect-[16/9] overflow-hidden">
          <Image src={article.image} alt={article.title} fill className="object-cover" />
        </div>
        <div className="mt-8 space-y-5 text-[15px] leading-8 text-[#333]">
          {article.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </article>
    </>
  );
}
