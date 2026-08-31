export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-xl">
      {eyebrow ? (
        <p className="mb-2 text-[12px] font-semibold tracking-[0.18em] text-muted uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-light tracking-wide uppercase md:text-4xl">{title}</h2>
      {children ? (
        <p className="mt-4 text-[14px] leading-7 text-muted">{children}</p>
      ) : null}
    </div>
  );
}
