import { Clock, MapPin, Phone } from "lucide-react";
import { serviceLocation, site } from "@/lib/data";

/** Service hours, service line and address for the I-9/3 workshop. */
export function WorkshopCard({ className = "" }: { className?: string }) {
  return (
    <aside className={`border border-line bg-[#f7f9fc] p-6 ${className}`}>
      <h3 className="text-[12px] font-semibold tracking-[0.16em] uppercase">Visit the workshop</h3>
      <dl className="mt-5 space-y-5 text-[14px] leading-6">
        <div className="flex gap-3">
          <Clock size={17} className="mt-0.5 shrink-0 text-accent" aria-hidden />
          <div>
            <dt className="font-medium">Service hours</dt>
            <dd className="text-muted">{site.hours.service}</dd>
          </div>
        </div>
        <div className="flex gap-3">
          <Phone size={17} className="mt-0.5 shrink-0 text-accent" aria-hidden />
          <div>
            <dt className="font-medium">Service line</dt>
            <dd>
              <a
                href={serviceLocation.phoneHref}
                className="text-muted transition-colors duration-300 ease-out hover:text-accent"
              >
                {serviceLocation.phone}
              </a>
            </dd>
          </div>
        </div>
        <div className="flex gap-3">
          <MapPin size={17} className="mt-0.5 shrink-0 text-accent" aria-hidden />
          <div>
            <dt className="font-medium">Address</dt>
            <dd className="text-muted">{serviceLocation.address}</dd>
            <dd className="mt-1">
              <a
                href={site.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[13px] font-semibold transition-colors duration-300 ease-out hover:text-accent"
              >
                Get directions ›
              </a>
            </dd>
          </div>
        </div>
      </dl>
    </aside>
  );
}
