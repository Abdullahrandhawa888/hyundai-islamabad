import type { Metadata } from "next";
import { Dancing_Script, Inter } from "next/font/google";
import { site } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-cursive",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | New Hyundai Dealer Islamabad`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Smooth scrolling is for in-page links; this tells Next.js to switch it
      // off while changing pages, so a new page doesn't visibly glide.
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${dancingScript.variable} h-full scroll-smooth antialiased`}
    >
      <body className={`${inter.className} flex min-h-full flex-col bg-white text-foreground`}>
        {children}
      </body>
    </html>
  );
}
