"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, MapPin, Menu, Phone, X } from "lucide-react";
import { navItems, site } from "@/lib/data";
import type { NavItem, NavLink } from "@/lib/types";
import { ContactDrawer } from "./ContactDrawer";

type LinkGroup = { title: string; links: NavLink[] };

/** Buckets a dropdown's links under their `group` heading, in first-seen order. */
function groupLinks(links: NavLink[]): LinkGroup[] {
  const groups: LinkGroup[] = [];
  for (const link of links) {
    const title = link.group?.trim() ?? "";
    const group = groups.find((item) => item.title === title);
    if (group) group.links.push(link);
    else groups.push({ title, links: [link] });
  }
  return groups;
}

function isWithin(pathname: string, href?: string) {
  if (!href) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isItemActive(pathname: string, item: NavItem) {
  return (
    isWithin(pathname, item.href) ||
    (item.children ?? []).some((child) => isWithin(pathname, child.href))
  );
}

/** The dropdown containing the current page, so the mobile menu opens on it. */
function activeSection(pathname: string) {
  return navItems.find((item) => item.children && isItemActive(pathname, item))?.label ?? null;
}

/** true once running in the browser (false during server render), so the
 * portal below only renders where document.body exists. */
function subscribeNever() {
  return () => {};
}

function slugify(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function Header() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const hoveredRef = useRef<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(() => activeSection(pathname));
  const [contactOpen, setContactOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const mounted = useSyncExternalStore(subscribeNever, () => true, () => false);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
    setMobileSection(activeSection(pathname));
  }

  // Touch screens have no mouseleave, so close an open dropdown on any tap
  // outside the nav.
  useEffect(() => {
    if (!openMenu) return;
    function onPointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openMenu]);

  return (
    <>
      <header className="border-b border-line bg-white">
        <div className="flex h-[88px] items-center">
          <a
            href="https://ittehad.com.pk"
            target="_blank"
            rel="noreferrer"
            className="hidden shrink-0 items-center py-3 pr-4 pl-4 sm:flex md:pr-6 md:pl-6"
            aria-label="Ittehad Motors"
          >
            <Image
              src="/images/ittehad-motors-logo.png"
              alt="Ittehad Motors"
              width={1854}
              height={618}
              className="h-8 w-auto md:h-9"
            />
          </a>

          <div className="mx-auto flex h-full max-w-[1400px] flex-1 items-center gap-4 px-4 md:px-6">
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

            <nav ref={navRef} className="hidden flex-1 items-center gap-1 self-stretch lg:flex">
              {navItems.map((item) => {
                const active = isItemActive(pathname, item);
                const tone = active ? "text-foreground" : "text-nav hover:text-foreground";
                const linkClass = `flex items-center gap-1 px-2 py-2 text-[13px] font-bold whitespace-nowrap transition-colors duration-300 ease-out xl:px-2.5 ${tone}`;

                if (!item.children) {
                  return (
                    <div key={item.label} className="flex h-full items-center">
                      <Link href={item.href ?? "/"} className={linkClass}>
                        {item.label}
                      </Link>
                    </div>
                  );
                }

                const open = openMenu === item.label;
                const panelId = `nav-menu-${slugify(item.label)}`;
                // A click while the pointer is over the item (or a tap, which
                // hovers first) keeps the menu open; a keyboard press toggles it.
                const toggle = () =>
                  setOpenMenu(open && hoveredRef.current !== item.label ? null : item.label);
                const chevron = (
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-300 ease-out ${open ? "rotate-180" : ""}`}
                  />
                );

                return (
                  <div
                    key={item.label}
                    className="relative flex h-full items-center"
                    onMouseEnter={() => {
                      hoveredRef.current = item.label;
                      setOpenMenu(item.label);
                    }}
                    onMouseLeave={() => {
                      hoveredRef.current = null;
                      setOpenMenu(null);
                    }}
                    onKeyDown={(event) => {
                      if (event.key !== "Escape" || !open) return;
                      setOpenMenu(null);
                      event.currentTarget.querySelector("button")?.focus();
                    }}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                        setOpenMenu(null);
                      }
                    }}
                  >
                    {item.href ? (
                      // The label opens the section's own page; the chevron
                      // opens the menu for keyboard and touch users.
                      <>
                        <Link href={item.href} className={`${linkClass} pr-0.5 xl:pr-0.5`}>
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          onClick={toggle}
                          aria-expanded={open}
                          aria-controls={panelId}
                          aria-label={`${item.label} menu`}
                          className={`flex items-center py-2 pr-2 pl-0.5 transition-colors duration-300 ease-out xl:pr-2.5 ${tone}`}
                        >
                          {chevron}
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={toggle}
                        aria-expanded={open}
                        aria-controls={panelId}
                        className={linkClass}
                      >
                        {item.label}
                        {chevron}
                      </button>
                    )}
                    <DropdownPanel id={panelId} item={item} open={open} pathname={pathname} />
                  </div>
                );
              })}
            </nav>

            <div className="ml-auto flex items-center gap-3">
              <a
                href={site.phoneHref}
                aria-label={`Call ${site.phoneDisplay}`}
                className="hidden items-center gap-2 text-[13px] font-semibold whitespace-nowrap text-nav transition-colors duration-300 ease-out hover:text-foreground md:flex"
              >
                <Phone size={15} />
                {/* Icon only from 1024-1279px, where the full menu needs the room. */}
                <span className="lg:hidden xl:inline">{site.phoneDisplay}</span>
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
                href="/contact"
                className="hidden border border-accent bg-accent px-3.5 py-1.5 text-[12px] font-semibold whitespace-nowrap text-white transition-all duration-300 ease-out hover:-translate-y-px hover:border-[#1557b0] hover:bg-[#1557b0] hover:shadow-md xl:inline-block"
              >
                Contact Us
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
        </div>
      </header>

      {/* Rendered into <body>: the header slides out of view on scroll
          (StickyHeader), and a fixed overlay inside a moved element would
          be moved with it. */}
      {mounted
        ? createPortal(
            <>
            <div
              className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-500 ease-out lg:hidden ${
                mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              onClick={() => setMobileOpen(false)}
            />
            <aside
              inert={!mobileOpen}
              className={`fixed top-0 left-0 z-50 flex h-full w-[86%] max-w-sm flex-col bg-white transition-transform duration-500 ease-out lg:hidden ${
                mobileOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-5">
                <span className="text-[15px] font-medium">{site.name}</span>
                <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex flex-1 flex-col overflow-y-auto overscroll-contain p-3">
                {navItems.map((item) => {
                  const active = isItemActive(pathname, item);
                  if (!item.children) {
                    return (
                      <div key={item.label} className="border-b border-line">
                        <Link
                          href={item.href ?? "/"}
                          className={`block px-2 py-3 text-[14px] font-semibold ${active ? "text-accent" : ""}`}
                        >
                          {item.label}
                        </Link>
                      </div>
                    );
                  }

                  const expanded = mobileSection === item.label;
                  const panelId = `mobile-nav-${slugify(item.label)}`;
                  const toggle = () => setMobileSection(expanded ? null : item.label);
                  const chevron = (
                    <ChevronDown
                      size={16}
                      className={`text-muted transition-transform duration-300 ease-out ${expanded ? "rotate-180" : ""}`}
                    />
                  );
                  return (
                    <div key={item.label} className="border-b border-line">
                      {item.href ? (
                        <div className="flex items-center">
                          <Link
                            href={item.href}
                            aria-current={pathname === item.href ? "page" : undefined}
                            className={`flex-1 px-2 py-3 text-[14px] font-semibold ${active ? "text-accent" : ""}`}
                          >
                            {item.label}
                          </Link>
                          <button
                            type="button"
                            onClick={toggle}
                            aria-expanded={expanded}
                            aria-controls={panelId}
                            aria-label={`${item.label} menu`}
                            className="px-3 py-3"
                          >
                            {chevron}
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={toggle}
                          aria-expanded={expanded}
                          aria-controls={panelId}
                          className="flex w-full items-center justify-between px-2 py-3 text-left text-[14px] font-semibold"
                        >
                          {item.label}
                          {chevron}
                        </button>
                      )}
                      <div
                        id={panelId}
                        inert={!expanded}
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="pb-3">
                            {groupLinks(item.children).map((group) => (
                              <div key={group.title || "links"}>
                                {group.title ? (
                                  <p className="px-4 pt-3 pb-1 text-[10.5px] font-semibold tracking-[0.16em] text-muted uppercase">
                                    {group.title}
                                  </p>
                                ) : null}
                                {group.links.map((link) => (
                                  <MobileLink
                                    key={link.href}
                                    href={link.href}
                                    current={isWithin(pathname, link.href)}
                                  >
                                    {link.label}
                                  </MobileLink>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <Link href="/contact" className="px-2 py-3 text-[14px] font-semibold">
                  Contact Us
                </Link>
              </nav>
            </aside>

            <ContactDrawer open={contactOpen} onClose={() => setContactOpen(false)} />
            </>,
            document.body,
          )
        : null}
    </>
  );
}

function MobileLink({
  href,
  current,
  children,
}: {
  href: string;
  current: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={`block px-4 py-2 text-[13px] ${current ? "font-semibold text-accent" : "text-muted"}`}
    >
      {children}
    </Link>
  );
}

function DropdownPanel({
  id,
  item,
  open,
  pathname,
}: {
  id: string;
  item: NavItem;
  open: boolean;
  pathname: string;
}) {
  const links = item.children ?? [];
  const groups = groupLinks(links);
  const visibility = open
    ? "visible translate-y-0 opacity-100"
    : "invisible -translate-y-1 opacity-0";

  // Plain list (e.g. Offers & Plans): no headings.
  if (!groups.some((group) => group.title)) {
    return (
      <div
        id={id}
        className={`absolute top-full left-0 -mt-px min-w-52 border border-line bg-white py-2 shadow-lg transition-all duration-200 ease-out ${visibility}`}
      >
        {links.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            aria-current={isWithin(pathname, child.href) ? "page" : undefined}
            className={`block px-4 py-2 text-[13px] transition-colors duration-200 ease-out hover:bg-[#f6f6f6] hover:text-foreground ${
              isWithin(pathname, child.href) ? "font-semibold text-foreground" : "text-nav"
            }`}
          >
            {child.label}
          </Link>
        ))}
      </div>
    );
  }

  // Grouped mega menu (e.g. After Sales): a column per heading, with the
  // section's picture faded in behind, like the original hyundai-islamabad.com menu.
  return (
    <div
      id={id}
      className={`absolute top-full left-1/2 -mt-px w-[46rem] -translate-x-1/2 overflow-hidden border border-line bg-white shadow-xl transition-all duration-300 ease-out ${visibility}`}
    >
      {item.image ? (
        <Image
          src={item.image}
          alt=""
          width={750}
          height={450}
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 w-[30rem] max-w-none -translate-x-[42%] -translate-y-1/2 opacity-[0.13] select-none"
        />
      ) : null}
      <div
        className="relative grid gap-8 px-10 py-9"
        style={{ gridTemplateColumns: `repeat(${groups.length}, minmax(0, 1fr))` }}
      >
        {groups.map((group) => (
          <div key={group.title || "links"}>
            {group.title ? (
              <p className="text-[17px] leading-snug font-normal text-foreground">{group.title}</p>
            ) : null}
            <ul className="mt-5 space-y-2.5">
              {group.links.map((link) => {
                const current = isWithin(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={current ? "page" : undefined}
                      className={`inline-block text-[14px] transition-all duration-200 ease-out hover:translate-x-1 hover:text-accent ${
                        current ? "font-semibold text-foreground" : "text-nav"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
