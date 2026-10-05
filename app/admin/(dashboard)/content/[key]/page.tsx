import { notFound } from "next/navigation";
import { ContentEditorPage } from "@/components/admin/ContentEditorPage";
import { CONTENT_REGISTRY, isContentKey } from "@/lib/admin/content-registry";

const IMAGE_FOLDERS: Record<string, string> = {
  vehicles: "vehicles",
  team: "team",
  news: "news",
  home: "hero",
  site: "misc",
};

export default async function AdminContentPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!isContentKey(key)) notFound();

  return (
    <ContentEditorPage
      contentKey={key}
      title={CONTENT_REGISTRY[key].label}
      imageFolder={IMAGE_FOLDERS[key] ?? "misc"}
    />
  );
}
