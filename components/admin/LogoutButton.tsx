"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
      }}
      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-[#5b6472] ring-1 ring-[#e1e5ec] transition-colors duration-200 hover:bg-[#f5f7fa] hover:text-foreground"
    >
      <LogOut size={14} aria-hidden />
      Sign out
    </button>
  );
}
