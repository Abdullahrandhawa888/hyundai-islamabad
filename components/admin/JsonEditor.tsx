"use client";

import { useState } from "react";
import { ImageField } from "./ImageField";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

function titleCase(key: string) {
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function isImageKey(key: string, value: unknown) {
  if (typeof value !== "string") return false;
  // PDFs (e.g. the price list) can live under /images/ too, but aren't images.
  if (/pdf/i.test(key) || /\.pdf([?#]|$)/i.test(value)) return false;
  if (value.startsWith("/images/")) return true;
  return /image|logo|photo/i.test(key);
}

/** Shape for a new item in an empty list, borrowed from the same list on a
 * sibling (e.g. another vehicle's variants), so "Add" creates a full entry
 * instead of a bare string. */
function siblingTemplate(siblings: Json[] | undefined, key: string): Json | undefined {
  for (const sibling of siblings ?? []) {
    if (sibling && typeof sibling === "object" && !Array.isArray(sibling)) {
      const list = sibling[key];
      if (Array.isArray(list) && list.length > 0) return list[0];
    }
  }
  return undefined;
}

function emptyLike(value: Json): Json {
  if (typeof value === "string") return "";
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  if (Array.isArray(value)) return [];
  if (value && typeof value === "object") {
    const out: { [key: string]: Json } = {};
    for (const k of Object.keys(value)) out[k] = emptyLike(value[k]);
    return out;
  }
  return "";
}

function isLongText(key: string, value: string) {
  return value.length > 70 || /bio|description|body|summary|detail|paragraph|note/i.test(key);
}

const SUMMARY_KEYS = ["shortName", "name", "title", "modelLabel", "label", "role", "id", "slug"];

function summaryLabel(item: Json, index: number): string {
  if (item && typeof item === "object" && !Array.isArray(item)) {
    for (const key of SUMMARY_KEYS) {
      const val = item[key];
      if (typeof val === "string" && val.trim()) return val;
    }
  }
  if (typeof item === "string" && item.trim()) return item;
  return `Item ${index + 1}`;
}

function summaryDetail(item: Json): string | null {
  if (!item || typeof item !== "object" || Array.isArray(item)) return null;
  if (typeof item.role === "string" && item.role) return item.role;
  if (typeof item.price === "number") return `Rs ${item.price.toLocaleString("en-PK")}`;
  if (Array.isArray(item.variants)) return `${item.variants.length} variant${item.variants.length === 1 ? "" : "s"}`;
  if (Array.isArray(item.tenures)) return `${item.tenures.length} tenure${item.tenures.length === 1 ? "" : "s"}`;
  if (typeof item.date === "string") return item.date;
  return null;
}

const inputClass =
  "w-full border border-line bg-white px-2.5 py-2 text-[13px] outline-none focus:border-accent";
const labelClass = "mb-1 block text-[11px] font-semibold tracking-wide text-muted uppercase";
const btnClass =
  "inline-flex items-center gap-1 text-[12px] font-semibold text-accent hover:text-[#1557b0]";
const removeBtnClass = "text-[12px] font-semibold text-red-600 hover:text-red-700";

function ArrayEditor({
  value,
  onChange,
  fieldKey,
  imageFolder,
  depth,
  itemTemplate,
}: {
  value: Json[];
  onChange: (next: Json[]) => void;
  fieldKey: string;
  imageFolder: string;
  depth: number;
  itemTemplate?: Json;
}) {
  const itemsAreObjects = value.length > 0 && value.every((v) => v && typeof v === "object" && !Array.isArray(v));
  const collapsible = itemsAreObjects && depth === 0;
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className={depth > 0 ? "space-y-3 border-l-2 border-line pl-4" : "space-y-3"}>
      {value.map((item, index) => {
        const isOpen = !collapsible || expanded.has(index);
        return (
          <div key={index} className="rounded-lg border border-line bg-[#fafbfc]">
            <div
              className={`flex items-center justify-between gap-3 p-3 ${collapsible ? "cursor-pointer select-none" : ""}`}
              onClick={collapsible ? () => toggle(index) : undefined}
            >
              <div className="flex min-w-0 items-center gap-2">
                {collapsible ? (
                  <span className="text-[11px] text-muted">{isOpen ? "▾" : "▸"}</span>
                ) : (
                  <span className="text-[11px] font-semibold text-muted">#{index + 1}</span>
                )}
                <span className="truncate text-[13px] font-semibold">{summaryLabel(item, index)}</span>
                {summaryDetail(item) ? (
                  <span className="shrink-0 text-[12px] text-muted">{summaryDetail(item)}</span>
                ) : null}
              </div>
              <div className="flex shrink-0 items-center gap-3" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => {
                    const next = [...value];
                    [next[index - 1], next[index]] = [next[index], next[index - 1]];
                    onChange(next);
                  }}
                  className="text-[12px] text-nav hover:text-foreground disabled:opacity-30"
                  aria-label="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={index === value.length - 1}
                  onClick={() => {
                    const next = [...value];
                    [next[index + 1], next[index]] = [next[index], next[index + 1]];
                    onChange(next);
                  }}
                  className="text-[12px] text-nav hover:text-foreground disabled:opacity-30"
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Remove "${summaryLabel(item, index)}"?`)) {
                      onChange(value.filter((_, i) => i !== index));
                    }
                  }}
                  className={removeBtnClass}
                >
                  Remove
                </button>
              </div>
            </div>
            {isOpen ? (
              <div className="border-t border-line p-3">
                <JsonEditor
                  value={item}
                  onChange={(next) => {
                    const copy = [...value];
                    copy[index] = next;
                    onChange(copy);
                  }}
                  fieldKey={fieldKey}
                  imageFolder={imageFolder}
                  depth={depth + 1}
                  siblings={value}
                />
              </div>
            ) : null}
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => {
          const template = value.length > 0 ? value[0] : itemTemplate;
          const next = [...value, template !== undefined ? emptyLike(template) : ""];
          onChange(next);
          if (collapsible) setExpanded((prev) => new Set(prev).add(next.length - 1));
        }}
        className={btnClass}
      >
        + Add {fieldKey ? titleCase(fieldKey).replace(/s$/, "") : "item"}
      </button>
    </div>
  );
}

export function JsonEditor({
  value,
  onChange,
  fieldKey = "",
  imageFolder = "misc",
  depth = 0,
  siblings,
  itemTemplate,
}: {
  value: Json;
  onChange: (next: Json) => void;
  fieldKey?: string;
  imageFolder?: string;
  depth?: number;
  /** The other items of the list this value belongs to (for siblingTemplate). */
  siblings?: Json[];
  /** Shape for "Add" when this value is an empty list. */
  itemTemplate?: Json;
}) {
  if (typeof value === "string") {
    if (isImageKey(fieldKey, value)) {
      return <ImageField value={value} onChange={(v) => onChange(v)} folder={imageFolder} />;
    }
    if (isLongText(fieldKey, value)) {
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={Math.min(8, Math.max(2, Math.ceil(value.length / 70)))}
          className={inputClass}
        />
      );
    }
    return (
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
    );
  }

  if (typeof value === "number") {
    return (
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={inputClass}
      />
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="inline-flex items-center gap-2 text-[13px]">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
        {value ? "Yes" : "No"}
      </label>
    );
  }

  if (value === null) {
    return (
      <button type="button" onClick={() => onChange("")} className={btnClass}>
        Set value
      </button>
    );
  }

  if (Array.isArray(value)) {
    return (
      <ArrayEditor
        value={value}
        onChange={onChange}
        fieldKey={fieldKey}
        imageFolder={imageFolder}
        depth={depth}
        itemTemplate={itemTemplate}
      />
    );
  }

  // object
  const entries = Object.entries(value);
  return (
    <div className={depth > 0 ? "space-y-4 border-l-2 border-line pl-4" : "space-y-4"}>
      {entries.map(([key, val]) => (
        <div key={key}>
          <span className={labelClass}>{titleCase(key)}</span>
          <JsonEditor
            value={val}
            onChange={(next) => onChange({ ...value, [key]: next })}
            fieldKey={key}
            imageFolder={imageFolder}
            depth={depth + 1}
            itemTemplate={
              Array.isArray(val) && val.length === 0 ? siblingTemplate(siblings, key) : undefined
            }
          />
        </div>
      ))}
    </div>
  );
}
