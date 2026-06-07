export default function Steps({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-4">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 text-sm font-semibold text-accent">
            {i + 1}
          </span>
          <p className="pt-1 text-sm leading-relaxed text-muted-foreground">
            {step}
          </p>
        </li>
      ))}
    </ol>
  );
}
