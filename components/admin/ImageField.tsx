"use client";

import Image from "next/image";
import { useRef, useState } from "react";

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
    <div className="flex items-center gap-3">
      <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded border border-line bg-[#f0f3f7]">
        {value ? (
          <Image src={value} alt="" fill sizes="80px" className="object-cover" unoptimized />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-line bg-white px-2.5 py-1.5 text-[12px] outline-none focus:border-accent"
          placeholder="/images/..."
        />
        <div className="mt-1 flex items-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="text-[11px] font-semibold text-accent hover:text-[#1557b0] disabled:opacity-60"
          >
            {uploading ? "Uploading..." : "Upload new image"}
          </button>
          {error ? <span className="text-[11px] text-red-600">{error}</span> : null}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
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
