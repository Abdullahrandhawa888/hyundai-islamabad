import { ArrowUpRight, MapPin } from "lucide-react";
import { site } from "@/lib/data";

/** Embedded Google Map of the dealership. The embed is display-only; the
 * whole card is one link that opens the location in Google Maps.
 * `compact` is for narrow spots like the header's contact panel: a shorter
 * map with just the button, since the address is listed right below it. */
export function MapCard({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={`group relative overflow-hidden border border-line bg-[#eef1f5] ${className}`}>
      <iframe
        src={site.mapEmbedUrl}
        title={`Map showing ${site.name}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        tabIndex={-1}
        aria-hidden
        className={`pointer-events-none block w-full border-0 ${compact ? "h-[280px]" : "h-[320px] md:h-[420px]"}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-navy/0 transition-colors duration-500 ease-out group-hover:bg-navy/10" />
      <a
        href={site.mapUrl}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 z-10 outline-offset-[-4px] focus-visible:outline-2 focus-visible:outline-accent"
      >
        <span className="sr-only">Open {site.name} in Google Maps</span>
      </a>
      {compact ? (
        // Kept above the bottom edge so Google's attribution stays visible.
        <span className="pointer-events-none absolute right-3 bottom-8 z-20 inline-flex items-center gap-1.5 bg-accent px-3.5 py-2 text-[12px] font-semibold tracking-wide text-white shadow-lg transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:bg-[#1557b0]">
          Open in Google Maps
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </span>
      ) : (
      /* Bottom-right, so it doesn't stack on Google's own place card (top-left). */
      <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 flex flex-col gap-4 bg-white/95 p-5 shadow-xl backdrop-blur-sm transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:flex-row sm:items-center sm:justify-between md:inset-x-auto md:right-6 md:bottom-6 md:max-w-xl">
        <div className="flex gap-3">
          <MapPin size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden />
          <div>
            <p className="text-[15px] font-medium">{site.name}</p>
            <p className="mt-0.5 text-[13px] leading-6 text-muted">{site.address}</p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 self-start bg-accent px-4 py-2.5 text-[12px] font-semibold tracking-wide text-white transition-colors duration-300 ease-out group-hover:bg-[#1557b0] sm:self-auto">
          Open in Google Maps
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </span>
      </div>
      )}
    </div>
  );
}
