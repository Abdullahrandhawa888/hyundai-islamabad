"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, MapPin, Menu, Phone, X } from "lucide-react";
import { navItems, site } from "@/lib/data";
import { ContactDrawer } from "./ContactDrawer";

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <div className="mx-auto flex h-[88px] max-w-[1400px] items-center gap-4 px-4 md:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image
              src={site.logo}
              alt={site.name}
              width={140}
              height={40}
              className="h-9 w-auto"
              priority
            />
          </Link>

          <nav className="hidden flex-1 items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-2.5 py-2 text-[13px] font-bold transition-colors duration-300 ease-out ${
                    pathname.startsWith(item.href)
                      ? "text-foreground"
                      : "text-nav hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {item.children ? (
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-300 ease-out ${
                        openMenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                  ) : null}
                </Link>
                {item.children ? (
                  <div
                    className={`absolute top-full left-0 min-w-52 border border-line bg-white py-2 shadow-lg transition-all duration-200 ease-out ${
                      openMenu === item.label
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-1 opacity-0"
                    }`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-[13px] text-nav transition-colors duration-200 ease-out hover:bg-[#f6f6f6] hover:text-foreground"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 text-[13px] font-semibold text-nav transition-colors duration-300 ease-out hover:text-foreground md:flex"
            >
              <Phone size={15} />
              {site.phoneDisplay}
            </a>
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              aria-label="Open locations"
              className="p-1 text-nav transition-colors duration-300 ease-out hover:text-foreground"
            >
              <MapPin size={18} />
            </button>
            <Link
              href="/enquiry"
              className="hidden border border-line px-3 py-1.5 text-[12px] font-semibold text-nav transition-colors duration-300 ease-out hover:border-foreground hover:text-foreground xl:inline-block"
            >
              Enquire
            </Link>
            <button
              type="button"
              className="p-1 text-foreground lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-500 ease-out lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      />
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[86%] max-w-sm bg-white transition-transform duration-500 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-5">
          <span className="text-[15px] font-medium">{site.name}</span>
          <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav className="flex flex-col p-3">
          {navItems.map((item) => (
            <div key={item.label} className="border-b border-line">
              <Link href={item.href} className="block px-2 py-3 text-[14px] font-semibold">
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-4 py-2 text-[13px] text-muted"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <Link href="/enquiry" className="px-2 py-3 text-[14px] font-semibold">
            Enquire
          </Link>
          <Link href="/testdrive" className="px-2 py-3 text-[14px] font-semibold">
            Request a Test Drive
          </Link>
        </nav>
      </aside>

      <ContactDrawer open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
