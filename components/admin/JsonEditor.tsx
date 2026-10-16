"use client";

import Image from "next/image";
import { createContext, useContext, useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, Lock, Plus, X } from "lucide-react";
import { rupees, type FieldHint, type FieldHints, type Json, type JsonObject } from "@/lib/admin/field-hints";
import { ImageField } from "./ImageField";

// One editor for every content file. It renders whatever is in the JSON, so a
// new field always appears; lib/admin/field-hints.ts makes known fields
// friendlier (labels, dropdowns, tabs, totals).

type EditorContextValue = { hints: FieldHints; imageFolder: string };
const EditorContext = createContext<EditorContextValue>({ hints: {}, imageFolder: "misc" });

function useHint(path: string): FieldHint {
  return useContext(EditorContext).hints[path] ?? {};
}

// Inside a list, only the first item shows help text and row labels; the
// rest stay compact (like a table with one header row).
const DisplayContext = createContext({ hideHelp: false, hideRowLabels: false });

const childPath = (path: string, key: string) => (path ? `${path}.${key}` : key);
const itemPath = (path: string) => `${path}[]`;

function titleCase(key: string) {
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
}

function singular(key: string) {
  const word = titleCase(key).toLowerCase();
  return word.endsWith("ies") ? word.slice(0, -3) + "y" : word.replace(/s$/, "");
}

function isImageKey(key: string, value: unknown) {
  if (typeof value !== "string") return false;
  // PDFs (e.g. the price list) can live under /images/ too, but aren't images.
  if (/pdf/i.test(key) || /\.pdf([?#]|$)/i.test(value)) return false;
  if (value.startsWith("/images/")) return true;
  return /image|logo|photo/i.test(key);
}

function isPrimitive(value: Json): value is string | number | boolean | null {
  return value === null || typeof value !== "object";
}

function isObject(value: Json | undefined): value is JsonObject {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function emptyLike(value: Json): Json {
  if (typeof value === "string") return "";
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  if (Array.isArray(value)) return [];
  if (isObject(value)) {
    const out: JsonObject = {};
    for (const k of Object.keys(value)) out[k] = emptyLike(value[k]);
    return out;
  }
  return "";
}

function isLongText(key: string, value: string) {
  return value.length > 70 || /bio|description|body|summary|detail|paragraph|intro/i.test(key);
}

/** Shape for a new item in an empty list, borrowed from the same list on a
 * sibling (e.g. another vehicle's variants), so "Add" creates a full entry. */
function siblingTemplate(siblings: Json[] | undefined, key: string): Json | undefined {
  for (const sibling of siblings ?? []) {
    if (isObject(sibling)) {
      const list = sibling[key];
      if (Array.isArray(list) && list.length > 0) return list[0];
    }
  }
  return undefined;
}

const SUMMARY_KEYS = ["shortName", "name", "title", "modelLabel", "label", "role", "item", "id", "slug"];
const THUMB_KEYS = ["cardImage", "image", "photo", "heroImage"];

function summaryLabel(item: Json, index: number): string {
  if (isObject(item)) {
    for (const key of SUMMARY_KEYS) {
      const val = item[key];
      if (typeof val === "string" && val.trim()) return val;
    }
  }
  if (typeof item === "string" && item.trim()) return item;
  return `Item ${index + 1}`;
}

function defaultDetail(item: Json): string | null {
  if (!isObject(item)) return null;
  if (typeof item.role === "string" && item.role) return item.role;
  if (typeof item.date === "string") return item.date;
  if (typeof item.price === "number") return rupees(item.price);
  return null;
}

function thumbnailOf(item: Json): string | null {
  if (!isObject(item)) return null;
  for (const key of THUMB_KEYS) {
    const val = item[key];
    if (typeof val === "string" && (val.startsWith("/") || val.startsWith("http"))) return val;
  }
  return null;
}

/** Small objects of short plain values (a colour, a spec, a phone line) fit on one row. */
function fitsOnOneRow(item: Json): boolean {
  if (!isObject(item)) return false;
  const values = Object.entries(item);
  return (
    values.length > 0 &&
    values.length <= 4 &&
    values.every(([key, val]) => isPrimitive(val) && !(typeof val === "string" && (isLongText(key, val) || isImageKey(key, val))))
  );
}

/** Full-width fields; everything else shares a row with its neighbours. */
function isWide(key: string, value: Json, hint: FieldHint) {
  if (!isPrimitive(value)) return true;
  if (hint.control === "textarea" || hint.control === "locked") return true;
  return typeof value === "string" && (isLongText(key, value) || isImageKey(key, value));
}

const inputClass =
  "w-full rounded-lg border border-[#dde2ea] bg-white px-3 py-2 text-[14px] text-foreground outline-none transition-colors duration-200 placeholder:text-[#a0a7b4] focus:border-accent focus:ring-2 focus:ring-accent/15";
const iconButton =
  "flex h-7 w-7 items-center justify-center rounded-md text-[#8a93a3] transition-colors duration-200 hover:bg-[#eef1f6] hover:text-foreground disabled:pointer-events-none disabled:opacity-30";
const addButton =
  "inline-flex items-center gap-1.5 rounded-lg border border-dashed border-[#c9d3e3] px-3 py-2 text-[13px] font-semibold text-accent transition-colors duration-200 hover:border-accent hover:bg-accent/5";

export function JsonEditor({
  value,
  onChange,
  hints = {},
  imageFolder = "misc",
}: {
  value: Json;
  onChange: (next: Json) => void;
  hints?: FieldHints;
  imageFolder?: string;
}) {
  return (
    <EditorContext.Provider value={{ hints, imageFolder }}>
      <Node value={value} onChange={onChange} path="" fieldKey="" depth={0} />
    </EditorContext.Provider>
  );
}

function Node({
  value,
  onChange,
  path,
  fieldKey,
  depth,
  template,
}: {
  value: Json;
  onChange: (next: Json) => void;
  path: string;
  fieldKey: string;
  depth: number;
  template?: Json;
}) {
  const hint = useHint(path);

  if (typeof value === "string") return <StringControl value={value} onChange={onChange} fieldKey={fieldKey} hint={hint} />;
  if (typeof value === "number") return <NumberControl value={value} onChange={onChange} hint={hint} />;
  if (typeof value === "boolean") return <Toggle value={value} onChange={onChange} />;
  if (value === null) {
    return (
      <button type="button" onClick={() => onChange("")} className={addButton}>
        <Plus size={14} /> Add a value
      </button>
    );
  }
  if (Array.isArray(value)) {
    if (hint.control === "checkboxes") return <CheckboxGroup value={value} onChange={onChange} hint={hint} />;
    const sample = value.length > 0 ? value[0] : template;
    if (sample === undefined || isPrimitive(sample)) {
      return <PrimitiveList value={value} onChange={onChange} path={path} fieldKey={fieldKey} hint={hint} template={sample} />;
    }
    return <ObjectList value={value} onChange={onChange} path={path} fieldKey={fieldKey} depth={depth} hint={hint} template={sample} />;
  }
  return <ObjectFields value={value} onChange={onChange} path={path} depth={depth} />;
}

function StringControl({
  value,
  onChange,
  fieldKey,
  hint,
}: {
  value: string;
  onChange: (next: string) => void;
  fieldKey: string;
  hint: FieldHint;
}) {
  const { imageFolder } = useContext(EditorContext);

  if (hint.control === "select" && hint.options) {
    const known = hint.options.some((option) => option.value === value);
    return (
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
        {value === "" ? <option value="">Choose...</option> : null}
        {!known && value !== "" ? <option value={value}>{value}</option> : null}
        {hint.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
  if (hint.control === "color") {
    const valid = /^#[0-9a-f]{6}$/i.test(value);
    return (
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={valid ? value.toLowerCase() : "#000000"}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="h-9 w-11 shrink-0 cursor-pointer rounded-lg border border-[#dde2ea] bg-white p-1"
          aria-label="Pick colour"
        />
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
      </div>
    );
  }
  if (hint.control === "locked") return <LockedField value={value} onChange={onChange} warning={hint.help} />;
  if (isImageKey(fieldKey, value)) return <ImageField value={value} onChange={onChange} folder={imageFolder} />;
  if (hint.control === "textarea" || isLongText(fieldKey, value)) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={Math.min(8, Math.max(3, Math.ceil(value.length / 80)))}
        className={`${inputClass} leading-6`}
      />
    );
  }
  return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />;
}

function LockedField({
  value,
  onChange,
  warning,
}: {
  value: string;
  onChange: (next: string) => void;
  warning?: string;
}) {
  const [unlocked, setUnlocked] = useState(false);
  if (!unlocked) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-lg border border-[#e6e9ef] bg-[#f7f8fa] px-3 py-2">
        <span className="flex min-w-0 items-center gap-2 text-[14px] text-[#5b6472]">
          <Lock size={13} className="shrink-0" aria-hidden />
          <span className="truncate">{value || "-"}</span>
        </span>
        <button
          type="button"
          onClick={() => setUnlocked(true)}
          className="shrink-0 text-[12px] font-semibold text-accent hover:text-[#1557b0]"
        >
          Change
        </button>
      </div>
    );
  }
  return (
    <div className="space-y-1.5">
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} autoFocus />
      {warning ? <p className="rounded-md bg-amber-50 px-2.5 py-1.5 text-[12px] leading-5 text-amber-800">{warning}</p> : null}
    </div>
  );
}

function NumberControl({
  value,
  onChange,
  hint,
}: {
  value: number;
  onChange: (next: number) => void;
  hint: FieldHint;
}) {
  if (hint.control === "money") return <MoneyInput value={value} onChange={onChange} />;
  return (
    <input
      type="number"
      inputMode="numeric"
      value={Number.isFinite(value) ? value : 0}
      onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
      className={`${inputClass} tabular-nums`}
    />
  );
}

/** A rupee amount shown with thousands separators while you type
 * ("6,449,000"), like on the printed price list. Keeps the cursor next to
 * the same digit when the commas move. */
function MoneyInput({ value, onChange }: { value: number; onChange: (next: number) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const digitsBeforeCaret = useRef<number | null>(null);
  const formatted = Number.isFinite(value) ? Math.round(value).toLocaleString("en-PK") : "0";

  useLayoutEffect(() => {
    const el = ref.current;
    const wanted = digitsBeforeCaret.current;
    digitsBeforeCaret.current = null;
    if (!el || wanted === null || document.activeElement !== el) return;
    let pos = 0;
    for (let seen = 0; pos < formatted.length && seen < wanted; pos++) {
      if (/\d/.test(formatted[pos])) seen++;
    }
    el.setSelectionRange(pos, pos);
  }, [formatted]);

  return (
    <div className="relative">
      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[13px] text-[#8a93a3]">Rs</span>
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        value={formatted}
        onChange={(e) => {
          const raw = e.target.value;
          const caret = e.target.selectionStart ?? raw.length;
          digitsBeforeCaret.current = raw.slice(0, caret).replace(/\D/g, "").replace(/^0+(?=\d)/, "").length;
          const digits = raw.replace(/\D/g, "");
          onChange(digits ? Number(digits) : 0);
        }}
        onFocus={(e) => e.target.select()}
        className={`${inputClass} pl-9 tabular-nums`}
      />
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (next: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className="inline-flex items-center gap-2.5 text-[14px]"
    >
      <span
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
          value ? "bg-accent" : "bg-[#cfd5df]"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
            value ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </span>
      {value ? "Yes" : "No"}
    </button>
  );
}

function CheckboxGroup({
  value,
  onChange,
  hint,
}: {
  value: Json[];
  onChange: (next: Json[]) => void;
  hint: FieldHint;
}) {
  const options = hint.options ?? [];
  const extras = value.filter((v) => typeof v === "string" && !options.some((o) => o.value === v)) as string[];
  const all = [...options, ...extras.map((v) => ({ label: v, value: v }))];
  return (
    <div className="flex flex-wrap gap-2">
      {all.map((option) => {
        const checked = value.includes(option.value);
        return (
          <label
            key={option.value}
            className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-[14px] transition-colors duration-200 ${
              checked ? "border-accent bg-accent/5 text-foreground" : "border-[#dde2ea] text-[#5b6472] hover:border-[#b9c3d3]"
            }`}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => {
                const next = checked
                  ? value.filter((v) => v !== option.value)
                  : all.map((o) => o.value).filter((v) => v === option.value || value.includes(v));
                onChange(next);
              }}
              className="h-4 w-4 accent-[var(--accent)]"
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
}

function move(list: Json[], from: number, to: number) {
  const next = [...list];
  [next[from], next[to]] = [next[to], next[from]];
  return next;
}

function RowButtons({
  index,
  count,
  onMove,
  onRemove,
}: {
  index: number;
  count: number;
  onMove: (to: number) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-0.5">
      <button type="button" disabled={index === 0} onClick={() => onMove(index - 1)} className={iconButton} aria-label="Move up" title="Move up">
        <ArrowUp size={14} />
      </button>
      <button type="button" disabled={index === count - 1} onClick={() => onMove(index + 1)} className={iconButton} aria-label="Move down" title="Move down">
        <ArrowDown size={14} />
      </button>
      <button
        type="button"
        onClick={onRemove}
        className={`${iconButton} hover:bg-red-50 hover:text-red-600`}
        aria-label="Remove"
        title="Remove"
      >
        <X size={15} />
      </button>
    </div>
  );
}

/** A list of plain values (features, pictures, paragraphs): one compact row each. */
function PrimitiveList({
  value,
  onChange,
  path,
  fieldKey,
  hint,
  template,
}: {
  value: Json[];
  onChange: (next: Json[]) => void;
  path: string;
  fieldKey: string;
  hint: FieldHint;
  template?: Json;
}) {
  return (
    <div className="space-y-2">
      {value.map((item, index) => (
        <div key={index} className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <Node
              value={item}
              onChange={(next) => onChange(value.map((v, i) => (i === index ? next : v)))}
              path={itemPath(path)}
              fieldKey={fieldKey}
              depth={1}
            />
          </div>
          <div className="pt-1">
            <RowButtons
              index={index}
              count={value.length}
              onMove={(to) => onChange(move(value, index, to))}
              onRemove={() => onChange(value.filter((_, i) => i !== index))}
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, template !== undefined ? emptyLike(template) : ""])}
        className={addButton}
      >
        <Plus size={14} /> {hint.addLabel ?? `Add ${fieldKey ? singular(fieldKey) : "item"}`}
      </button>
    </div>
  );
}

/** A list of records. At the top of a page, each record is a collapsed row
 * that opens on click; inside a record, items are small cards or single rows. */
function ObjectList({
  value,
  onChange,
  path,
  fieldKey,
  depth,
  hint,
  template,
}: {
  value: Json[];
  onChange: (next: Json[]) => void;
  path: string;
  fieldKey: string;
  depth: number;
  hint: FieldHint;
  template?: Json;
}) {
  const itemHint = useHint(itemPath(path));
  const display = useContext(DisplayContext);
  const collapsible = depth === 0;
  const [open, setOpen] = useState<Set<number>>(new Set());
  // Every item after the first hides help text and row labels.
  const quiet = (index: number) => ({
    hideHelp: display.hideHelp || index > 0,
    hideRowLabels: display.hideRowLabels || index > 0,
  });

  const toggle = (index: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  const update = (index: number, next: Json) => onChange(value.map((v, i) => (i === index ? next : v)));
  const remove = (index: number) => {
    if (confirm(`Remove "${summaryLabel(value[index], index)}"? You can still cancel by not publishing.`)) {
      onChange(value.filter((_, i) => i !== index));
      setOpen(new Set());
    }
  };
  const moveItem = (index: number, to: number) => {
    onChange(move(value, index, to));
    setOpen((prev) => {
      const next = new Set<number>();
      for (const i of prev) next.add(i === index ? to : i === to ? index : i);
      return next;
    });
  };

  const addLabel = hint.addLabel ?? `Add ${fieldKey ? singular(fieldKey) : "item"}`;
  const add = () => {
    const blank = template !== undefined ? emptyLike(template) : {};
    onChange([...value, blank]);
    if (collapsible) setOpen((prev) => new Set(prev).add(value.length));
  };

  return (
    <div className={collapsible ? "space-y-3" : "space-y-2.5"}>
      {value.map((item, index) => {
        const label = itemHint.summary?.(item as JsonObject).title ?? summaryLabel(item, index);

        if (!collapsible && fitsOnOneRow(item)) {
          return (
            <DisplayContext.Provider key={index} value={quiet(index)}>
              <div className="flex items-end gap-2 rounded-xl border border-[#e6e9ef] bg-white px-3 py-2.5">
                <div className="min-w-0 flex-1">
                  <ObjectFields value={item as JsonObject} onChange={(next) => update(index, next)} path={itemPath(path)} depth={depth + 1} siblings={value} row />
                </div>
                <div className="pb-1">
                  <RowButtons index={index} count={value.length} onMove={(to) => moveItem(index, to)} onRemove={() => remove(index)} />
                </div>
              </div>
            </DisplayContext.Provider>
          );
        }

        if (!collapsible) {
          return (
            <DisplayContext.Provider key={index} value={quiet(index)}>
              <div className="rounded-xl border border-[#e6e9ef] bg-white">
                <div className="flex items-center justify-between gap-3 border-b border-[#eef0f4] px-4 py-2.5">
                  <span className="truncate text-[13px] font-semibold">{label}</span>
                  <RowButtons index={index} count={value.length} onMove={(to) => moveItem(index, to)} onRemove={() => remove(index)} />
                </div>
                <div className="p-4">
                  <ObjectFields value={item as JsonObject} onChange={(next) => update(index, next)} path={itemPath(path)} depth={depth + 1} siblings={value} />
                </div>
              </div>
            </DisplayContext.Provider>
          );
        }

        const isOpen = open.has(index);
        const thumb = thumbnailOf(item);
        const detail = itemHint.summary?.(item as JsonObject).detail ?? defaultDetail(item);
        return (
          <div
            key={index}
            className={`overflow-hidden rounded-2xl border bg-white transition-shadow duration-300 ${
              isOpen ? "border-[#d4dbe6] shadow-[0_8px_30px_-12px_rgba(0,44,95,0.18)]" : "border-[#e6e9ef] hover:shadow-sm"
            }`}
          >
            <div className="flex items-center gap-3 px-4 py-3">
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="flex min-w-0 flex-1 items-center gap-3 text-left"
              >
                {thumb ? (
                  <span className="relative h-11 w-16 shrink-0 overflow-hidden rounded-lg bg-[#f2f4f8]">
                    <Image src={thumb} alt="" fill sizes="64px" className="object-contain" unoptimized />
                  </span>
                ) : null}
                <span className="min-w-0">
                  <span className="block truncate text-[15px] font-semibold">{label}</span>
                  {detail ? <span className="block truncate text-[12.5px] text-[#8a93a3]">{detail}</span> : null}
                </span>
                <ChevronDown
                  size={18}
                  className={`ml-auto shrink-0 text-[#8a93a3] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <RowButtons index={index} count={value.length} onMove={(to) => moveItem(index, to)} onRemove={() => remove(index)} />
            </div>
            {isOpen ? (
              <div className="border-t border-[#eef0f4] bg-[#fbfcfd] p-4 md:p-6">
                {isObject(item) ? (
                  <ObjectFields value={item} onChange={(next) => update(index, next)} path={itemPath(path)} depth={depth + 1} siblings={value} />
                ) : (
                  <Node value={item} onChange={(next) => update(index, next)} path={itemPath(path)} fieldKey={fieldKey} depth={depth + 1} />
                )}
              </div>
            ) : null}
          </div>
        );
      })}
      <button type="button" onClick={add} className={addButton}>
        <Plus size={14} /> {addLabel}
      </button>
    </div>
  );
}

function ObjectFields({
  value,
  onChange,
  path,
  depth,
  siblings,
  row = false,
}: {
  value: JsonObject;
  onChange: (next: JsonObject) => void;
  path: string;
  depth: number;
  siblings?: Json[];
  row?: boolean;
}) {
  const { hints } = useContext(EditorContext);
  const hint = useHint(path);
  const [tab, setTab] = useState(0);
  const order = hint.order ?? [];
  const keys = [
    ...order.filter((key) => key in value),
    ...Object.keys(value).filter((key) => !order.includes(key)),
  ].filter((key) => !hints[childPath(path, key)]?.hidden);
  const layout =
    hint.columns === 4
      ? { grid: "sm:grid-cols-2 lg:grid-cols-4", span: "sm:col-span-2 lg:col-span-4" }
      : { grid: "sm:grid-cols-2 lg:grid-cols-3", span: "sm:col-span-2 lg:col-span-3" };

  const field = (key: string) => (
    <Field
      key={key}
      name={key}
      value={value[key]}
      onChange={(next) => onChange({ ...value, [key]: next })}
      parentPath={path}
      depth={depth}
      siblings={siblings}
      compact={row}
    />
  );

  if (row) {
    return (
      <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${keys.length}, minmax(0, 1fr))` }}>
        {keys.map(field)}
      </div>
    );
  }

  const footer = hint.footer?.(value);
  const fieldGrid = (fieldKeys: string[]) => (
    <div className={`grid gap-x-4 gap-y-5 ${layout.grid}`}>
      {fieldKeys.map((key) => (
        <div key={key} className={isWide(key, value[key], hints[childPath(path, key)] ?? {}) ? layout.span : ""}>
          {field(key)}
        </div>
      ))}
      {footer ? (
        <p className={`rounded-lg bg-accent/5 px-3 py-2 text-[13px] font-semibold text-accent ${layout.span}`}>
          {footer} <span className="font-normal text-[#5b6472]">· adds up automatically</span>
        </p>
      ) : null}
    </div>
  );

  if (hint.groups) {
    const grouped = hint.groups
      .map((group) => ({ title: group.title, fields: group.fields.filter((key) => keys.includes(key)) }))
      .filter((group) => group.fields.length > 0);
    const listed = new Set(grouped.flatMap((group) => group.fields));
    const rest = keys.filter((key) => !listed.has(key));
    if (rest.length > 0) grouped.push({ title: "More", fields: rest });
    const active = Math.min(tab, grouped.length - 1);

    return (
      <div>
        <div role="tablist" className="-mx-1 mb-5 flex gap-1 overflow-x-auto px-1 pb-1">
          {grouped.map((group, index) => (
            <button
              key={group.title}
              type="button"
              role="tab"
              aria-selected={index === active}
              onClick={() => setTab(index)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors duration-200 ${
                index === active ? "bg-navy text-white" : "bg-white text-[#5b6472] ring-1 ring-[#e1e5ec] hover:text-foreground"
              }`}
            >
              {group.title}
            </button>
          ))}
        </div>
        {fieldGrid(grouped[active].fields)}
      </div>
    );
  }

  return fieldGrid(keys);
}

function Field({
  name,
  value,
  onChange,
  parentPath,
  depth,
  siblings,
  compact = false,
}: {
  name: string;
  value: Json;
  onChange: (next: Json) => void;
  parentPath: string;
  depth: number;
  siblings?: Json[];
  compact?: boolean;
}) {
  const path = childPath(parentPath, name);
  const hint = useHint(path);
  const display = useContext(DisplayContext);
  const label = hint.label ?? titleCase(name);
  const template = Array.isArray(value) && value.length === 0 ? siblingTemplate(siblings, name) : undefined;
  const isGroup = Array.isArray(value) || isObject(value);
  const labelHidden = compact && display.hideRowLabels;

  return (
    <div>
      <span
        className={
          labelHidden
            ? "sr-only"
            : `block font-semibold text-[#3d4553] ${compact ? "mb-1 text-[11.5px]" : "mb-1.5 text-[13px]"}`
        }
      >
        {label}
      </span>
      {hint.help && !compact && !display.hideHelp && hint.control !== "locked" ? (
        <p className="-mt-0.5 mb-2 text-[12px] leading-5 text-[#8a93a3]">{hint.help}</p>
      ) : null}
      <div className={isGroup && isObject(value) ? "rounded-xl border border-[#e6e9ef] bg-white p-4" : ""}>
        <Node value={value} onChange={onChange} path={path} fieldKey={name} depth={depth} template={template} />
      </div>
    </div>
  );
}
