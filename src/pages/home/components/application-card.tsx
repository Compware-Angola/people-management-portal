import { Button } from "@/components/ui/button"
import { Link  } from "@tanstack/react-router"
import type {LinkProps} from "@tanstack/react-router";
import { ArrowRight, FileCheck,  } from "lucide-react"

export function ApplicationCard({
  icon,
  eyebrow,
  title,
  description,
  benefits,
  cta,
  to,
}: {
  icon: React.ReactNode
  eyebrow: string
  title: string
  description: string
  benefits: string[]
  cta: string
  to: LinkProps['to']
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl sm:p-10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl opacity-60 transition-opacity group-hover:opacity-100" />
 
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
        {icon}
      </div>
 
      <p className="mt-6 text-xs font-medium uppercase tracking-widest text-primary">
        {eyebrow}
      </p>
      <h3 className="mt-2 text-3xl font-semibold leading-tight text-foreground">
        {title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
 
      <ul className="mt-6 space-y-3">
        {benefits.map((b) => (
          <li key={b} className="flex items-start gap-3 text-sm text-foreground/85">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FileCheck className="h-3 w-3" />
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
 
      <Button size="lg" className="mt-8 w-full gap-2" asChild>
        <Link to={to}>
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  )
}
