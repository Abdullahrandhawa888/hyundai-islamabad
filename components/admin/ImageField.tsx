"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImageUp } from "lucide-react";

export function ImageField({
  value,
  onChange,
  folder,
}: {
  value: string;
  onChange: (next: string) => void;
  folder: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPath, setShowPath] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("folder", folder);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Upload failed.");
      onChange(body.path);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#e6e9ef] bg-white p-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="group relative h-20 w-32 shrink-0 overflow-hidden rounded-lg bg-[#f2f4f8] ring-1 ring-[#e6e9ef]"
        aria-label="Replace picture"
      >
        {value ? (
          <Image src={value} alt="" fill sizes="128px" className="object-contain p-1" unoptimized />
        ) : (
          <span className="flex h-full items-center justify-center text-[12px] text-[#a0a7b4]">No picture</span>
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-navy/0 text-white opacity-0 transition-all duration-200 group-hover:bg-navy/55 group-hover:opacity-100">
          <ImageUp size={20} />
        </span>
      </button>
      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-[12.5px] font-semibold text-white transition-colors duration-200 hover:bg-[#1557b0] disabled:opacity-60"
        >
          <ImageUp size={14} />
          {uploading ? "Uploading..." : value ? "Replace picture" : "Upload picture"}
        </button>
        <p className="mt-1.5 text-[12px] text-[#8a93a3]">PNG, JPG or WebP, up to 8 MB.</p>
        {error ? <p className="mt-1 text-[12px] text-red-600">{error}</p> : null}
        <button
          type="button"
          onClick={() => setShowPath((v) => !v)}
          className="mt-1 text-[11.5px] text-[#8a93a3] underline-offset-2 hover:text-foreground hover:underline"
        >
          {showPath ? "Hide file path" : "Show file path"}
        </button>
        {showPath ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-[#dde2ea] px-2.5 py-1.5 text-[12px] outline-none focus:border-accent"
            placeholder="/images/..."
          />
        ) : null}
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}
