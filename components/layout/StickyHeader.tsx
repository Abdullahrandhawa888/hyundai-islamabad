"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Hide-on-scroll-down / reveal-on-scroll-up, as on Toyota UK and Lexus UK.
// The timings bar and header move together as one unit.
//
// Tuning: hiding waits until the header's own space has scrolled away (so no
// blank strip appears at the top), and both directions need a little steady
// travel first, so trackpad and phone momentum scrolling can't make it flicker.
const HIDE_AFTER_PX = 12;
const REVEAL_AFTER_PX = 8;
const TOP_ZONE_HEADER_HEIGHTS = 1.5;

/** The pinned site header. Also publishes its height and state on <html>
 * (--site-header-height, data-site-header) so other sticky elements, like the
 * Warranty page's "On this page" list, can sit just below it. */
export function StickyHeader({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // A new page always starts with the header showing.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setHidden(false);
  }

  // Open every new page at the very top. Next.js only scrolls to the top when
  // the new page's first element is out of view; with this header pinned over
  // the page, a page scrolled a little still counts as "in view", so the next
  // page used to open with the top of its banner hidden behind the header.
  // Back/Forward keep the browser's own scroll restoration, and links to a
  // #section still go to that section.
  const isFirstRender = useRef(true);
  const isHistoryNavigation = useRef(false);
  useEffect(() => {
    const onPopState = () => {
      isHistoryNavigation.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isHistoryNavigation.current) {
      isHistoryNavigation.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let lastY = Math.max(0, window.scrollY);
    let travel = 0; // distance scrolled in the current direction (+ down, - up)
    let frame = 0;

    // Never hide while a menu is open or a keyboard user is inside the header.
    const mustStayVisible = () =>
      el.querySelector('[aria-expanded="true"]') !== null || el.querySelector(":focus-visible") !== null;

    const update = () => {
      frame = 0;
      const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      // Clamp, so iOS rubber-band overscroll at either end isn't read as scrolling.
      const y = Math.min(Math.max(window.scrollY, 0), maxY);
      const delta = y - lastY;
      lastY = y;
      setAtTop(y < 4);
      if (delta === 0) return;

      travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta;

      if (y <= el.offsetHeight * TOP_ZONE_HEADER_HEIGHTS || mustStayVisible()) {
        setHidden(false);
      } else if (travel >= HIDE_AFTER_PX) {
        setHidden(true);
      } else if (travel <= -REVEAL_AFTER_PX) {
        setHidden(false);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Tabbing into the header while it's hidden brings it back. The browser
    // also scrolls the page to "show" the newly focused link - a smooth,
    // several-hundred-pixel jump. So on Tab we note where the reader is, make
    // that focus-scroll instant, and put the page back before it's painted.
    const root = document.documentElement;
    let tabFromY: number | null = null;
    let focusedWhileHidden = false;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || el.getBoundingClientRect().bottom > 0) return;
      tabFromY = window.scrollY;
      focusedWhileHidden = false;
      root.style.scrollBehavior = "auto";
      requestAnimationFrame(() => {
        if (focusedWhileHidden && tabFromY !== null) {
          window.scrollTo({ top: tabFromY, behavior: "instant" });
          lastY = tabFromY;
          travel = 0;
        }
        tabFromY = null;
        root.style.scrollBehavior = "";
      });
    };

    const onFocusIn = (event: FocusEvent) => {
      if (!(event.target instanceof Element) || !event.target.matches(":focus-visible")) return;
      if (tabFromY !== null) focusedWhileHidden = true;
      setHidden(false);
    };

    // Share the header's height (it changes with screen width) with the page.
    const resize = new ResizeObserver(() => {
      root.style.setProperty("--site-header-height", `${el.offsetHeight}px`);
    });
    resize.observe(el);

    window.addEventListener("scroll", onScroll, { passive: true });
    // Capture phase, so we see the Tab before the browser moves focus.
    document.addEventListener("keydown", onKeyDown, true);
    el.addEventListener("focusin", onFocusIn);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKeyDown, true);
      el.removeEventListener("focusin", onFocusIn);
      resize.disconnect();
      cancelAnimationFrame(frame);
      root.style.scrollBehavior = "";
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.siteHeader = hidden ? "hidden" : "shown";
  }, [hidden]);

  return (
    <div
      ref={ref}
      className={`sticky top-0 z-40 transition-[translate,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        hidden ? "-translate-y-full" : ""
      } ${atTop || hidden ? "" : "shadow-[0_6px_20px_-12px_rgba(0,0,0,0.35)]"}`}
    >
      {children}
    </div>
  );
}
