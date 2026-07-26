import { Link } from '@tanstack/react-router'
type Step ={
  title: string
  optional?: boolean
}

type StepsSidebarProps ={
  steps: Step[]
  currentStep: number
}

export function StepsSidebar({ steps, currentStep }: StepsSidebarProps) {
  return (
    <aside className="w-full hidden xl:flex xl:w-80 shrink-0 bg-background border-r border-border text-foreground  flex-col p-6 xl:p-8 xl:h-screen xl:sticky xl:top-0 xl:self-start">
      <Link to='/' className="mb-14 flex items-center gap-2.5">
        <img src="/logo_uma.webp" alt="Universidade Metodista de Angola" className="h-40 w-60 object-contain" />
      </Link>
      <nav className="flex-1">
        <ol className="relative pl-1">
          <span
            className="absolute left-1.25 top-1 bottom-1 w-px bg-border"
            aria-hidden="true"
          />
          <span
            className="absolute left-1.25 top-1 w-px bg-primary transition-all duration-500 ease-out"
            style={{
              height: `${(currentStep / (steps.length - 1)) * 100}%`,
            }}
            aria-hidden="true"
          />
          {steps.map((s, index) => {
            const isActive = index === currentStep
            const isDone = index < currentStep
            return (
              <li key={s.title} className="relative pb-8 last:pb-0">
                <div
                  className={`group relative flex items-center gap-3.5 rounded-lg -ml-2 pl-2 pr-2.5 py-1.5 transition-colors duration-200 ${isActive ? 'bg-muted' : 'hover:bg-muted/50'
                    }`}
                >
                  <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                    {isActive && (
                      <span className="absolute h-4 w-4 rounded-full bg-primary/15 animate-pulse" />
                    )}
                    <span
                      className={`relative h-2.5 w-2.5 rounded-full transition-all duration-300 ${isDone
                        ? 'bg-primary scale-100'
                        : isActive
                          ? 'bg-primary scale-110'
                          : 'bg-border scale-90 group-hover:bg-muted-foreground/40'
                        }`}
                    />
                  </span>

                  <div className="flex flex-col leading-tight">
                    <span
                      className={`text-sm transition-colors duration-200 ${isActive
                        ? 'text-foreground font-medium'
                        : isDone
                          ? 'text-foreground/70 font-medium'
                          : 'text-muted-foreground'
                        }`}
                    >
                      {s.title}
                    </span>
                    {s.optional && (
                      <span className="text-xs text-muted-foreground/70">
                        Opcional
                      </span>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </nav>
      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} Universidade Metodista de Angola
        </p>
      </div>
    </aside>
  )
}
