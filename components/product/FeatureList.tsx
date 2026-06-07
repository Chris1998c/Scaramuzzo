import { Check } from "lucide-react";

export default function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 rounded-2xl border border-border/40 bg-card/40 p-4"
        >
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <span className="text-sm leading-relaxed text-foreground/90">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
