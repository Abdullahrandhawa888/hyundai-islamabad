"use client";

import { extraPhones, locations, site } from "@/lib/data";
import { X } from "lucide-react";

export function ContactDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-500 ease-out ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="text-lg font-light tracking-wide">Contact</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close contact"
            className="p-1 text-muted transition-colors duration-300 ease-out hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>
        <div className="space-y-6 overflow-y-auto px-6 py-6">
          {locations.map((location) => (
            <div key={location.id} className="border-b border-line pb-5">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
                {location.type}
              </p>
              <p className="mt-1 text-[15px] font-medium">{location.name}</p>
              <p className="mt-1 text-[13px] text-muted">{location.address}</p>
              <a
                href={location.phoneHref}
                className="mt-2 inline-block text-[14px] text-foreground transition-colors duration-300 ease-out hover:text-accent"
              >
                {location.type}: {location.phone}
              </a>
            </div>
          ))}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
              Additional lines
            </p>
            <ul className="mt-2 space-y-1 text-[14px]">
              {extraPhones.map((phone) => (
                <li key={phone.href + phone.display}>
                  <a
                    href={phone.href}
                    className="transition-colors duration-300 ease-out hover:text-accent"
                  >
                    {phone.label}: {phone.display}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 block text-[14px] transition-colors duration-300 ease-out hover:text-accent"
            >
              {site.email}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
