import { Link } from '@tanstack/react-router'
import { ChevronRight, type LucideIcon } from 'lucide-react'

interface NavCardProps {
  title: string
  description: string
  icon: LucideIcon
  to: string
  accent?: 'primary' | 'blue' | 'emerald' | 'amber'
}

type Accent = NonNullable<NavCardProps['accent']>

const ACCENT_STYLES: Record<Accent, { bg: string; text: string }> = {
  primary: { bg: 'bg-primary/10', text: 'text-primary' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600' },
}

export function NavCard({
  title,
  description,
  icon: Icon,
  to,
  accent = 'primary',
}: NavCardProps) {
  const styles = ACCENT_STYLES[accent]

  return (
    <Link
      to={to}
      className="group flex items-start gap-4 rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.bg} ${styles.text}`}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  )
}