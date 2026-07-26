import { Clock3, FileCheck, ShieldCheck, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
     <section className="relative overflow-hidden">
        {/* decorative rings */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full border border-primary/10" />
          <div className="absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-primary/5" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Recrutamento Académico
            </span>

            <h1 className="mt-8 text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Candidate-se para fazer{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">
                  parte da instituição
                </span>
                <span className="absolute inset-x-0 bottom-2 -z-0 h-3 bg-primary/15" />
              </span>
              .
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Escolha o tipo de candidatura pretendida e submeta os seus
              documentos de forma simples, segura e totalmente online.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Confidencial</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-primary" />
                <span>Resposta rápida</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-primary" />
                <span>100% digital</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}