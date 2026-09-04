import { useState } from 'react'
import { revalidateLogic } from '@tanstack/react-form'
import { Card, CardContent } from '@/components/ui/card'
import { useAppForm } from '@/components/forms'
import { AcademicStep } from './components/academic-Step'
import { DocumentsStep } from './components/documents-step'
import { wizardFormOpts } from './utils'
import { useCreateTeacherApplication } from '@/hooks/application'
import { TeachingExperienceStep } from './components/experience'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { usePublicVacancy } from '@/hooks/public-vacancies'

const steps = [
  { title: 'Formação académica' },
  { title: 'Experiência profissional/Docente' },
  { title: 'Anexar Documentos' },
]

export function TeatcherApplicationPage() {
  const navigate = useNavigate()
  const { vacancyCode } = useSearch({
    from: '/_private/accounts/applications/create',
  })
  const [step, setStep] = useState(0)
  const vacancyQuery = usePublicVacancy(vacancyCode ?? '')
  
  const {mutateAsync:createTeacherApp} = useCreateTeacherApplication()

  const form = useAppForm({
    ...wizardFormOpts,
    validationLogic: revalidateLogic(),
    onSubmit: async ({ value }) => {
    if (!vacancyCode) {
      toast.error('Selecione uma vaga antes de submeter a candidatura')
      return
    }

    await createTeacherApp({ vacancyCode })
    form.reset()
    navigate({ to: '/accounts/applications' })
    
    },
  })

  const current = steps[step]
  const progress = ((step + 1) / steps.length) * 100

  return (
    <div className="w-full">
      <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Link to="/">
        <Button variant="link" className="mb-2 px-0">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </Link>

      <div className="mb-4 flex flex-wrap gap-2">
        {steps.map((item, index) => (
          <span
            key={item.title}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${
              index === step
                ? 'border-primary bg-primary text-primary-foreground'
                : index < step
                  ? 'border-primary/30 bg-primary/10 text-primary'
                  : 'border-border bg-background text-muted-foreground'
            }`}
          >
            {index + 1}. {item.title}
          </span>
        ))}
      </div>

      <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span>
          Etapa {step + 1} de {steps.length}
        </span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        {current.title}
      </h1>

      <Card
        key={step}
        className="mt-6 animate-in border-border/60 shadow-sm shadow-black/3 fade-in slide-in-from-bottom-1 duration-300"
      >
        <CardContent className="p-6 lg:p-8">
          {step === 0 && (
            <AcademicStep form={form} step={step} setStep={setStep} />
          )}
          {step === 1 && (
            <TeachingExperienceStep form={form} step={step} setStep={setStep} />
          )}
          {step === 2 && (
            <DocumentsStep
              form={form}
              step={step}
              setStep={setStep}
              vacancy={vacancyQuery.data}
              isLoadingVacancy={vacancyQuery.isLoading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
