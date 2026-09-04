import { useMemo, useState } from 'react'
import {
  Briefcase,
  Clock3,
  FileCheck,
  GraduationCap,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { usePublicVacancies } from '@/hooks/public-vacancies'
import {
  CONTRACTS,
  LEVELS,
  REGIMES,
  type JobCategory,
  type Job,
} from '@/lib/jobs'
import type { PublicVacancy } from '@/service/public-vacancies'

import { HomeHeader } from './components/home-header'
import { JobCard } from './components/job-card'
import { SiteFooter } from './components/site-footer'

type Filters = {
  q: string
  category: JobCategory | 'todas'
  faculty: string
  contract: string
  regime: string
  level: string
  sort: 'recentes' | 'prazo' | 'populares'
}

const INITIAL: Filters = {
  q: '',
  category: 'todas',
  faculty: 'todas',
  contract: 'todos',
  regime: 'todos',
  level: 'todos',
  sort: 'recentes',
}

function getDescription(value: Record<string, unknown> | null | undefined) {
  if (!value) return '-'

  return String(
    value.description ??
      value.designation ??
      value.name ??
      value.DESCRICAO ??
      value.DESIGNACAO ??
      value.NOME ??
      '-',
  )
}

function getOpenedDaysAgo(value: string | null) {
  if (!value) return 0

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 0

  const diff = Date.now() - date.getTime()
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
}

function formatDate(value: string | null) {
  if (!value) return 'Sem prazo definido'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Sem prazo definido'

  return date.toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function mapPublicVacancyToJob(vacancy: PublicVacancy): Job {
  const title = getDescription(vacancy.position)
  const department = getDescription(vacancy.department)
  const contract = getDescription(vacancy.hiringType)

  return {
    id: vacancy.code,
    title,
    category: 'docente',
    faculty: department,
    contract: contract as Job['contract'],
    regime: 'Presencial',
    level: 'Licenciatura',
    location: 'Universidade Metodista de Angola',
    deadline: formatDate(vacancy.closingDate),
    openedDaysAgo: getOpenedDaysAgo(vacancy.publicationDate),
    summary: `${vacancy.numberOfVacancies} ${
      vacancy.numberOfVacancies === 1 ? 'vaga disponível' : 'vagas disponíveis'
    } para ${title}.`,
    bullets: [],
    description: [
      `Vaga publicada para ${title}. Consulte os detalhes e submeta a sua candidatura dentro do prazo definido.`,
    ],
    requirements: [],
    benefits: [],
    documents:
      vacancy.documents?.map((document) =>
        document.description || document.originalName || document.type || '-',
      ) ?? [],
    applicants: 0,
  }
}

export function Home() {
  const [filters, setFilters] = useState<Filters>(INITIAL)
  const { data: vacancies, isLoading } = usePublicVacancies({
    page: 1,
    limit: 50,
  })
  const jobs = useMemo(
    () => vacancies?.data.map(mapPublicVacancyToJob) ?? [],
    [vacancies],
  )
  const faculties = useMemo(
    () => Array.from(new Set(jobs.map((job) => job.faculty))).filter(Boolean),
    [jobs],
  )
  const contracts = useMemo(
    () => Array.from(new Set(jobs.map((job) => job.contract))).filter(Boolean),
    [jobs],
  )

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((prev) => ({ ...prev, [key]: value }))

  const results = useMemo(() => {
    const q = filters.q.trim().toLowerCase()
    const list = jobs.filter((job) => {
      if (filters.category !== 'todas' && job.category !== filters.category) {
        return false
      }

      if (filters.faculty !== 'todas' && job.faculty !== filters.faculty) {
        return false
      }

      if (filters.contract !== 'todos' && job.contract !== filters.contract) {
        return false
      }

      if (filters.regime !== 'todos' && job.regime !== filters.regime) {
        return false
      }

      if (filters.level !== 'todos' && job.level !== filters.level) {
        return false
      }

      if (
        q &&
        !`${job.title} ${job.faculty} ${job.summary}`
          .toLowerCase()
          .includes(q)
      ) {
        return false
      }

      return true
    })

    return [...list].sort((a, b) => {
      if (filters.sort === 'populares') return b.applicants - a.applicants
      if (filters.sort === 'prazo') return a.openedDaysAgo - b.openedDaysAgo

      return a.openedDaysAgo - b.openedDaysAgo
    })
  }, [filters, jobs])

  const activeFilters =
    (filters.category !== 'todas' ? 1 : 0) +
    (filters.faculty !== 'todas' ? 1 : 0) +
    (filters.contract !== 'todos' ? 1 : 0) +
    (filters.regime !== 'todos' ? 1 : 0) +
    (filters.level !== 'todos' ? 1 : 0) +
    (filters.q ? 1 : 0)

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />

      <section className="relative overflow-hidden bg-hero">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[560px] w-[560px] -translate-x-1/2 rounded-full border border-accent/25" />
          <div className="absolute left-1/2 top-12 h-[380px] w-[380px] -translate-x-1/2 rounded-full border border-accent/15" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Recrutamento Académico 2026
            </span>

            <h1 className="mt-7 font-display text-4xl leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Encontre a sua vaga na{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">
                  Universidade Metodista de Angola
                </span>
                <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-accent/50" />
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Vagas para o corpo docente e técnico-administrativo. Filtre por
              faculdade, tipo de contrato e regime, e candidate-se em minutos.
            </p>

            <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl border border-border bg-card p-3 shadow-card-soft sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={filters.q}
                  onChange={(event) => set('q', event.target.value)}
                  placeholder="Cargo, faculdade ou palavra-chave"
                  className="border-0 bg-transparent pl-9 shadow-none focus-visible:ring-0"
                  aria-label="Pesquisar vagas"
                />
              </div>
              <Button className="gap-2 sm:w-auto">
                <Search className="h-4 w-4" />
                Pesquisar
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> Confidencial
              </span>
              <span className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-primary" /> Resposta rápida
              </span>
              <span className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-primary" /> 100% digital
              </span>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card-soft">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg text-foreground">
                  Filtros
                </h2>
                {activeFilters > 0 && (
                  <button
                    onClick={() => setFilters(INITIAL)}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-smooth hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                    Limpar ({activeFilters})
                  </button>
                )}
              </div>

              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Categoria
                  </p>
                  <div className="mt-2 grid gap-2">
                    <CategoryButton
                      active={filters.category === 'todas'}
                      onClick={() => set('category', 'todas')}
                      label="Todas as vagas"
                      icon={<Briefcase className="h-4 w-4" />}
                      count={jobs.length}
                    />
                    <CategoryButton
                      active={filters.category === 'docente'}
                      onClick={() => set('category', 'docente')}
                      label="Corpo docente"
                      icon={<GraduationCap className="h-4 w-4" />}
                      count={
                        jobs.filter((job) => job.category === 'docente').length
                      }
                    />
                    <CategoryButton
                      active={filters.category === 'tecnico'}
                      onClick={() => set('category', 'tecnico')}
                      label="Técnico-administrativo"
                      icon={<Briefcase className="h-4 w-4" />}
                      count={
                        jobs.filter((job) => job.category === 'tecnico').length
                      }
                    />
                  </div>
                </div>

                <SelectField
                  label="Faculdade / Unidade"
                  value={filters.faculty}
                  onChange={(value) => set('faculty', value)}
                  allLabel="Todas"
                  allValue="todas"
                  options={faculties}
                />
                <SelectField
                  label="Tipo de contrato"
                  value={filters.contract}
                  onChange={(value) => set('contract', value)}
                  allLabel="Todos"
                  allValue="todos"
                  options={contracts.length > 0 ? contracts : [...CONTRACTS]}
                />
                <SelectField
                  label="Regime"
                  value={filters.regime}
                  onChange={(value) => set('regime', value)}
                  allLabel="Todos"
                  allValue="todos"
                  options={[...REGIMES]}
                />
                <SelectField
                  label="Grau académico"
                  value={filters.level}
                  onChange={(value) => set('level', value)}
                  allLabel="Todos"
                  allValue="todos"
                  options={[...LEVELS]}
                />
              </div>
            </div>
          </aside>

          <section>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-2xl text-foreground">
                  Vagas abertas
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {results.length} {results.length === 1 ? 'vaga' : 'vagas'}{' '}
                  encontradas
                </p>
              </div>

              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                Ordenar por
                <select
                  value={filters.sort}
                  onChange={(event) =>
                    set('sort', event.target.value as Filters['sort'])
                  }
                  className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="recentes">Mais recentes</option>
                  <option value="prazo">Prazo mais próximo</option>
                  <option value="populares">Mais candidaturas</option>
                </select>
              </label>
            </div>

            {isLoading ? (
              <div className="mt-8 rounded-2xl border border-dashed border-border p-12 text-center">
                <p className="font-display text-lg text-foreground">
                  Carregando vagas abertas...
                </p>
              </div>
            ) : results.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-dashed border-border p-12 text-center">
                <p className="font-display text-lg text-foreground">
                  Nenhuma vaga corresponde aos filtros
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Experimente remover alguns filtros ou alterar a pesquisa.
                </p>
                <Button
                  variant="outline"
                  className="mt-5"
                  onClick={() => setFilters(INITIAL)}
                >
                  Limpar filtros
                </Button>
              </div>
            ) : (
              <div className="mt-6 grid gap-5 xl:grid-cols-2">
                {results.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </section>
        </div>

        <section className="mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Como funciona
            </p>
            <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
              Três passos para submeter a sua candidatura
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Step
              n="01"
              title="Escolha a vaga"
              text="Explore as vagas abertas e use os filtros para encontrar a oportunidade certa."
            />
            <Step
              n="02"
              title="Envie os documentos"
              text="Preencha o formulário e anexe os documentos exigidos diretamente na plataforma."
            />
            <Step
              n="03"
              title="Acompanhe o processo"
              text="Consulte o estado da candidatura e receba notificações em cada etapa."
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

function CategoryButton({
  active,
  onClick,
  label,
  icon,
  count,
}: {
  active: boolean
  onClick: () => void
  label: string
  icon: React.ReactNode
  count: number
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition-smooth ${
        active
          ? 'border-transparent bg-gradient-navy text-primary-foreground shadow-elegant'
          : 'border-border bg-background text-foreground hover:bg-muted'
      }`}
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
      <span
        className={
          active ? 'text-primary-foreground/70' : 'text-muted-foreground'
        }
      >
        {count}
      </span>
    </button>
  )
}

function SelectField({
  label,
  value,
  onChange,
  options,
  allLabel,
  allValue,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
  allLabel: string
  allValue: string
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
      >
        <option value={allValue}>{allLabel}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

function Step({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-7 shadow-card-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant">
      <span className="font-display text-4xl text-accent">{n}</span>
      <h3 className="mt-3 font-display text-xl text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {text}
      </p>
    </div>
  )
}
