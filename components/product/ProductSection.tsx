import { ReactNode } from "react";

interface ProductSectionProps {
  kicker?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function ProductSection({
  kicker,
  title,
  children,
  className = "",
}: ProductSectionProps) {
  return (
    <section className={`border-t border-border/40 py-12 sm:py-14 ${className}`}>
      {(kicker || title) && (
        <div className="mb-8">
          {kicker && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {kicker}
            </p>
          )}
          {title && (
            <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
