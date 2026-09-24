import { Clock } from "lucide-react";
import { site } from "@/lib/data";

function shorten(hours: string) {
  return hours.replace(/:00/g, "").replace(/\b0(\d)/g, "$1").replace(/ (AM|PM)/g, "$1");
}

const salesShort = shorten(site.hours.sales);
const serviceShort = shorten(site.hours.service);

function LiveDot() {
  return (
    <span className="relative flex h-1.5 w-1.5 shrink-0 sm:h-2 sm:w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 sm:h-2 sm:w-2" />
    </span>
  );
}

export function TimingsBar() {
  return (
    <div className="animate-timings-in overflow-hidden bg-navy shadow-[0_2px_14px_rgba(0,44,95,0.35)]">
      {/* Mobile and tablet: two compact single-line rows */}
      <div className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-center lg:hidden">
        <p className="flex items-center gap-1.5 text-[10.5px] leading-tight whitespace-nowrap text-white sm:text-[12px]">
          <LiveDot />
          <span className="font-bold tracking-wide uppercase">Sales</span>
          <span className="text-white/85">{salesShort}</span>
        </p>
        <p className="flex items-center gap-1.5 text-[10.5px] leading-tight whitespace-nowrap text-white sm:text-[12px]">
          <Clock size={11} className="shrink-0 text-white/70" />
          <span className="font-bold tracking-wide uppercase">Service</span>
          <span className="text-white/85">{serviceShort}</span>
        </p>
      </div>

      {/* Desktop: single centered line with full text */}
      <div className="mx-auto hidden max-w-[1400px] items-center justify-center gap-x-5 px-6 py-1.5 text-center lg:flex">
        <LiveDot />
        <Clock size={13} className="shrink-0 text-white/80" />
        <p className="text-[13px] leading-tight font-medium text-white">
          <span className="font-bold tracking-wide uppercase">Sales</span>{" "}
          <span className="text-white/85">{site.hours.sales}</span>
        </p>
        <span className="h-3 w-px shrink-0 bg-white/30" />
        <p className="text-[13px] leading-tight font-medium text-white">
          <span className="font-bold tracking-wide uppercase">Service</span>{" "}
          <span className="text-white/85">{site.hours.service}</span>
        </p>
      </div>
    </div>
  );
}
