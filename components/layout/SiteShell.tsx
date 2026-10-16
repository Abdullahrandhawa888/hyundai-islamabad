import { Footer } from "./Footer";
import { Header } from "./Header";
import { StickyHeader } from "./StickyHeader";
import { TimingsBar } from "./TimingsBar";
import { WhatsAppButton } from "./WhatsAppButton";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-white text-foreground">
      <StickyHeader>
        <TimingsBar />
        <Header />
      </StickyHeader>
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
