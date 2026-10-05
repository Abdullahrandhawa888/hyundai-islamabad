"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { JsonEditor } from "./JsonEditor";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

export function ContentEditorPage({
  contentKey,
  title,
  imageFolder,
}: {
  contentKey: string;
  title: string;
  imageFolder: string;
}) {
  const [data, setData] = useState<Json | null>(null);
  const [sha, setSha] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conflict, setConflict] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    setConflict(false);
    try {
      const res = await fetch(`/api/admin/content/${contentKey}`, { cache: "no-store" });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Could not load content.");
      setData(body.data);
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

  async function handleSave() {
    if (!sha) return;
    setSaving(true);
    setError(null);
    setConflict(false);
    try {
      const res = await fetch(`/api/admin/content/${contentKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, sha }),
      });
      const body = await res.json();
      if (!res.ok) {
        if (body.conflict) setConflict(true);
        throw new Error(body.error ?? "Could not save.");
      }
      setSha(body.sha);
      setSavedAt(Date.now());
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
        <div>
          <Link href="/admin" className="text-[12px] text-muted hover:text-foreground">
            ← Dashboard
          </Link>
          <h1 className="mt-1 text-2xl font-light">{title}</h1>
        </div>
        {data !== null ? (
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || loading}
            className="bg-accent px-5 py-2.5 text-[13px] font-semibold text-white transition-colors duration-300 ease-out hover:bg-[#1557b0] disabled:opacity-60"
          >
            {saving ? "Publishing..." : "Publish changes"}
          </button>
        ) : null}
      </div>

      {savedAt ? (
        <p className="mt-4 bg-emerald-50 px-4 py-2.5 text-[13px] text-emerald-800">
          Saved. This change was committed to GitHub and will go live on the website in about 1–3
          minutes while Vercel rebuilds the site.
        </p>
      ) : null}

      {error ? (
        <div className="mt-4 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          <p>{error}</p>
          {conflict ? (
            <button type="button" onClick={load} className="mt-2 font-semibold underline">
              Reload latest version
            </button>
          ) : null}
        </div>
      ) : null}

      {loading ? (
        <p className="mt-8 text-[14px] text-muted">Loading...</p>
      ) : data !== null ? (
        <div className="mt-8">
          <JsonEditor value={data} onChange={setData} imageFolder={imageFolder} />
        </div>
      ) : null}
    </div>
  );
}
