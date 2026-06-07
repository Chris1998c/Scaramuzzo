interface InfoCard {
  n?: string;
  title: string;
  text: string;
}

export default function InfoCards({ items }: { items: InfoCard[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((c) => (
        <div
          key={c.title}
          className="rounded-2xl border border-border/50 bg-card/50 p-6"
        >
          {c.n && (
            <span className="text-sm font-semibold tracking-widest text-accent">
              {c.n}
            </span>
          )}
          <h3 className="mt-3 text-lg font-semibold">{c.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {c.text}
          </p>
        </div>
      ))}
    </div>
  );
}
