import { Footer } from "./Footer";
import { Header } from "./Header";
import { TimingsBar } from "./TimingsBar";
import { WhatsAppButton } from "./WhatsAppButton";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-white text-foreground">
      <div className="sticky top-0 z-40">
        <TimingsBar />
        <Header />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
