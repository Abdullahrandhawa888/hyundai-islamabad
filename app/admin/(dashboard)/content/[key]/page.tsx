import { notFound } from "next/navigation";
import { ContentEditorPage } from "@/components/admin/ContentEditorPage";
import { CONTENT_REGISTRY, isContentKey } from "@/lib/admin/content-registry";

const IMAGE_FOLDERS: Record<string, string> = {
  vehicles: "vehicles",
  team: "team",
  news: "news",
  home: "hero",
  site: "misc",
  service: "after-sales",
  nav: "after-sales",
  "price-list": "pricelist",
};

export default async function AdminContentPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!isContentKey(key)) notFound();
  const entry = CONTENT_REGISTRY[key];

  return (
    <ContentEditorPage
      contentKey={key}
      title={entry.label}
      description={entry.description}
      viewHref={entry.viewHref}
      imageFolder={IMAGE_FOLDERS[key] ?? "misc"}
    />
  );
}
