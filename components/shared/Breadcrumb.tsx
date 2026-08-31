import Link from "next/link";

type Crumb = { label: string; href?: string };

export function Breadcrumb({
  items,
  light = false,
}: {
  items: Crumb[];
  light?: boolean;
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-[12px] tracking-wide">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.href ?? "current"}-${index}`} className="flex items-center gap-2">
            {item.href ? (
              <Link
                href={item.href}
                className={
                  light ? "text-white/80 hover:text-white" : "text-muted hover:text-foreground"
                }
              >
                {item.label}
              </Link>
            ) : (
              <span className={light ? "text-white" : "text-foreground"}>{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span className={light ? "text-white/50" : "text-muted"}>›</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
