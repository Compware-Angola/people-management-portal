export function StepCard({
  n,
  title,
  text,
}: {
  n: string
  title: string
  text: string
}) {
  return (
    <div className="relative rounded-2xl border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <span className="text-5xl font-bold text-primary/40">
        {n}
      </span>

      <h4 className="mt-3 text-xl font-semibold">
        {title}
      </h4>

      <p className="mt-2 text-sm text-muted-foreground">
        {text}
      </p>
    </div>
  )
}