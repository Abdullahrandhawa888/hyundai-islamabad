"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Building2, FileText, MapPin, Phone, UserRound, X, type LucideIcon } from "lucide-react";
import { bookingNotice, site } from "@/lib/data";

// Shown once per visit (browser session), shortly after the first page loads.
const SEEN_KEY = "hyundai-islamabad:booking-notice-seen";
const SECTION_ICONS: LucideIcon[] = [FileText, UserRound, Building2];

export function BookingNotice() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<Element | null>(null);

  useEffect(() => {
    if (!bookingNotice.enabled) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // Storage blocked (private mode etc.): just show it.
    }
    if (seen) return;
    const timer = setTimeout(() => setOpen(true), 700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement;
    closeRef.current?.focus();
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = previousOverflow;
      if (lastFocus.current instanceof HTMLElement) lastFocus.current.focus();
    };
  }, [open]);

  function close() {
    setOpen(false);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
  }

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div
        className="animate-notice-backdrop absolute inset-0 bg-[#0b1626]/60 backdrop-blur-[2px]"
        onClick={close}
        aria-hidden
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-notice-title"
        className="animate-notice-in relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]"
      >
        <div className="h-1 shrink-0 bg-navy" aria-hidden />
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-3.5 right-3.5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#f2f4f7] text-[#4a5262] transition-colors duration-200 hover:bg-navy hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="overflow-y-auto overscroll-contain px-6 pt-7 pb-6 sm:px-9 sm:pt-8">
          <Image src={site.logo} alt={site.name} width={523} height={147} className="h-8 w-auto" />
          <h2 id="booking-notice-title" className="mt-5 pr-8 text-[22px] leading-snug font-semibold text-navy sm:text-[26px]">
            {bookingNotice.title}
          </h2>

          <div className="mt-6 space-y-5">
            {bookingNotice.sections.map((section, index) => {
              const Icon = SECTION_ICONS[index] ?? FileText;
              return (
                <div key={section.title + index} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Icon size={18} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold">{section.title}</h3>
                    <ul className="mt-1.5 space-y-1.5">
                      {section.items.map((item) => (
                        <li key={item} className="flex gap-2 text-[14px] leading-6 text-[#3d4553]">
                          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid gap-3 border border-line bg-[#f7f9fc] p-4 sm:grid-cols-2">
            <a
              href={site.phoneHref}
              className="flex items-center gap-3 text-[14px] transition-colors duration-200 hover:text-accent"
            >
              <Phone size={17} className="shrink-0 text-accent" aria-hidden />
              <span>
                <span className="block text-[11px] font-semibold tracking-[0.12em] text-muted uppercase">Call us</span>
                <span className="font-semibold">{site.phoneDisplay}</span>
              </span>
            </a>
            <a
              href={site.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-[14px] transition-colors duration-200 hover:text-accent"
            >
              <MapPin size={17} className="shrink-0 text-accent" aria-hidden />
              <span>
                <span className="block text-[11px] font-semibold tracking-[0.12em] text-muted uppercase">
                  Visit the dealership
                </span>
                <span className="font-semibold">{site.address}</span>
              </span>
            </a>
          </div>

          {bookingNotice.notes.length > 0 ? (
            <ul className="mt-5 space-y-1 text-[12px] leading-5 text-muted">
              {bookingNotice.notes.map((note) => (
                <li key={note}>* {note}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="flex shrink-0 flex-col-reverse gap-2.5 border-t border-line px-6 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-9">
          <a
            href={site.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center border border-line px-5 py-2.5 text-[13px] font-semibold transition-colors duration-200 hover:border-foreground"
          >
            Get directions
          </a>
          <button
            type="button"
            onClick={close}
            className="inline-flex items-center justify-center bg-accent px-6 py-2.5 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[#1557b0]"
          >
            Continue to website
          </button>
        </div>
      </section>
    </div>,
    document.body,
  );
}
