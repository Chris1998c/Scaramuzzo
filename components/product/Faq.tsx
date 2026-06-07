interface FaqItem {
  q: string;
  a: string;
}

export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details
          key={i}
          className="group rounded-2xl border border-border/40 bg-card/40 p-5"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between text-base font-medium">
            {item.q}
            <span className="ml-4 text-xl leading-none text-accent transition-transform duration-300 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
