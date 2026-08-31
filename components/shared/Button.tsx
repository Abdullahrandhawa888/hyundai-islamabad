import Link from "next/link";

type Variant = "primary" | "outline" | "ghost" | "light";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const styles: Record<Variant, string> = {
  primary:
    "bg-accent text-white border border-accent hover:bg-[#1557b0] hover:border-[#1557b0]",
  outline:
    "bg-white text-foreground border border-foreground hover:bg-foreground hover:text-white",
  ghost:
    "bg-transparent text-white border-0 p-0 hover:opacity-80 inline-flex items-center gap-1",
  light:
    "bg-white/10 text-white border border-white hover:bg-white hover:text-foreground",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const cls = `inline-flex items-center justify-center px-5 py-2.5 text-[13px] font-semibold tracking-wide transition-all duration-300 ease-out ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function DiscoverLink({
  href,
  children = "Discover Now",
  light = false,
}: {
  href: string;
  children?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors duration-300 ease-out ${
        light ? "text-white" : "text-foreground"
      } hover:text-accent`}
    >
      <span aria-hidden>›</span>
      {children}
    </Link>
  );
}
