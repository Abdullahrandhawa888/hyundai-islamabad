import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowUpRight } from "lucide-react";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin/auth";
import { site } from "@/lib/data";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const email = verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value);

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <header className="border-b border-[#e6e9ef] bg-white">
        <div className="h-[3px] bg-navy" aria-hidden />
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src={site.logo} alt={site.name} width={523} height={147} className="h-8 w-auto" priority />
            <span className="h-6 w-px bg-[#e1e5ec]" aria-hidden />
            <span className="text-[13px] font-semibold tracking-wide text-[#5b6472]">Admin</span>
          </Link>
          <div className="flex items-center gap-4 text-[13px]">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1 font-medium text-[#5b6472] transition-colors duration-200 hover:text-foreground sm:inline-flex"
            >
              View website <ArrowUpRight size={14} aria-hidden />
            </a>
            {email ? (
              <span className="hidden items-center gap-2 text-[#5b6472] md:flex">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-[12px] font-semibold text-white uppercase">
                  {email.charAt(0)}
                </span>
                {email}
              </span>
            ) : null}
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10">{children}</main>
    </div>
  );
}
