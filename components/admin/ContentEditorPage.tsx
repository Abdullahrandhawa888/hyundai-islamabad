"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, CircleCheck, LoaderCircle } from "lucide-react";
import { FIELD_HINTS, type Json } from "@/lib/admin/field-hints";
import { JsonEditor } from "./JsonEditor";

const isRecord = (value: Json): value is { [key: string]: Json } =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "item";
}

/** Items added in the editor start with an empty web address (slug or id).
 * Fill those in from the item's name before publishing, since a blank one
 * would stop the website from rebuilding. Existing ones are never changed. */
function fillMissingIds(data: Json): Json {
  if (!Array.isArray(data)) return data;
  const used = new Set<string>();
  for (const item of data) {
    if (!isRecord(item)) continue;
    for (const key of ["slug", "id"]) {
      const val = item[key];
      if (typeof val === "string" && val.trim()) used.add(val);
    }
  }
  return data.map((item) => {
    if (!isRecord(item)) return item;
    let next = item;
    for (const key of ["slug", "id"]) {
      const current = item[key];
      if (typeof current !== "string" || current.trim()) continue;
      const source = [item.shortName, item.name, item.title, item.modelLabel, item.label].find(
        (val): val is string => typeof val === "string" && val.trim() !== "",
      );
      const base = slugify(source ?? "item");
      let candidate = base;
      for (let n = 2; used.has(candidate); n++) candidate = `${base}-${n}`;
      used.add(candidate);
      next = { ...next, [key]: candidate };
    }
    return next;
  });
}

export function ContentEditorPage({
  contentKey,
  title,
  description,
  viewHref,
  imageFolder,
}: {
  contentKey: string;
  title: string;
  description: string;
  viewHref: string;
  imageFolder: string;
}) {
  const [data, setData] = useState<Json | null>(null);
  const [savedJson, setSavedJson] = useState<string | null>(null);
  const [sha, setSha] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conflict, setConflict] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const dirty = data !== null && savedJson !== null && JSON.stringify(data) !== savedJson;

  async function load() {
    setLoading(true);
    setError(null);
    setConflict(false);
    try {
      const res = await fetch(`/api/admin/content/${contentKey}`, { cache: "no-store" });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Could not load content.");
      setData(body.data);
      setSavedJson(JSON.stringify(body.data));
      setSha(body.sha);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional fetch-on-mount
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentKey]);

  // Warn before closing the tab or reloading with unpublished edits.
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  async function handleSave() {
    if (!sha || data === null) return;
    setSaving(true);
    setError(null);
    setConflict(false);
    const toSave = fillMissingIds(data);
    try {
      const res = await fetch(`/api/admin/content/${contentKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: toSave, sha }),
      });
      const body = await res.json();
      if (!res.ok) {
        if (body.conflict) setConflict(true);
        throw new Error(body.error ?? "Could not save.");
      }
      setSha(body.sha);
      setData(toSave);
      setSavedJson(JSON.stringify(toSave));
      setSavedAt(Date.now());
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  const status = saving
    ? { text: "Publishing...", tone: "text-accent" }
    : dirty
      ? { text: "Unpublished changes", tone: "text-amber-600" }
      : savedAt
        ? { text: "Published", tone: "text-emerald-600" }
        : { text: "No changes yet", tone: "text-[#8a93a3]" };

  return (
    <div>
      <div className="sticky top-0 z-30 -mx-5 mb-6 border-b border-[#e6e9ef] bg-[#f5f7fa]/90 px-5 py-4 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <Link
              href="/admin"
              onClick={(event) => {
                if (dirty && !confirm("You have changes that aren't published yet. Leave without publishing?")) {
                  event.preventDefault();
                }
              }}
              className="inline-flex items-center gap-1 text-[12.5px] font-medium text-[#6b7383] hover:text-foreground"
            >
              <ArrowLeft size={14} aria-hidden /> All sections
            </Link>
            <h1 className="mt-0.5 truncate text-[24px] font-light tracking-tight">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className={`hidden items-center gap-1.5 text-[13px] font-medium sm:inline-flex ${status.tone}`}>
              {saving ? <LoaderCircle size={14} className="animate-spin" aria-hidden /> : null}
              {!saving && !dirty && savedAt ? <CircleCheck size={14} aria-hidden /> : null}
              {status.text}
            </span>
            <a
              href={viewHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-medium text-[#5b6472] ring-1 ring-[#dde2ea] transition-colors duration-200 hover:bg-white hover:text-foreground"
            >
              View page <ArrowUpRight size={14} aria-hidden />
            </a>
            {data !== null ? (
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || loading || !dirty}
                className="rounded-lg bg-accent px-5 py-2 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1557b0] disabled:cursor-not-allowed disabled:bg-[#b9c6db] disabled:shadow-none"
              >
                {saving ? "Publishing..." : "Publish changes"}
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <p className="max-w-3xl text-[14px] leading-6 text-[#6b7383]">{description}</p>

      {savedAt && !dirty ? (
        <p className="mt-4 flex items-start gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-[13px] text-emerald-800 ring-1 ring-emerald-100">
          <CircleCheck size={16} className="mt-0.5 shrink-0" aria-hidden />
          Published. The website will show your change in about 1-3 minutes, while it rebuilds.
        </p>
      ) : null}

      {error ? (
        <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-[13px] text-red-700 ring-1 ring-red-100">
          <p>{error}</p>
          {conflict ? (
            <button type="button" onClick={load} className="mt-2 font-semibold underline">
              Reload the latest version
            </button>
          ) : null}
        </div>
      ) : null}

      {loading ? (
        <p className="mt-8 flex items-center gap-2 text-[14px] text-[#8a93a3]">
          <LoaderCircle size={16} className="animate-spin" aria-hidden /> Loading...
        </p>
      ) : data !== null ? (
        <div className="mt-6">
          <JsonEditor value={data} onChange={setData} hints={FIELD_HINTS[contentKey]} imageFolder={imageFolder} />
        </div>
      ) : null}
    </div>
  );
}
