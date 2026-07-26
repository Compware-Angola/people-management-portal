import { useState } from 'react'
import { revalidateLogic } from '@tanstack/react-form'
import { Card, CardContent } from '@/components/ui/card'
import { useAppForm } from '@/components/forms'
import { StepsSidebar } from '../components/StepsSidebar'
import { PersonalStep } from './components/personal-step'
import { AcademicStep } from './components/academic-Step'
import { applicationSchema} from './schemas/application-schema'
import type {ApplicationFormData} from './schemas/application-schema';
import { DocumentsStep } from './components/documents-step'
import { buildApplicationFormData, wizardFormOpts } from './utils'
import { useCreateTeacherApplication } from '@/hooks/application'
import { TeachingExperienceStep } from './components/experience'
import { Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const steps = [
  { title: 'Dados pessoais' },
  { title: 'Formação académica' },
  { title: 'Experiência profissional/Docente' },
  { title: 'Anexar Documentos' },
]

export function TeatcherApplicationPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  
  const {mutateAsync:createTeacherApp} = useCreateTeacherApplication()

  const form = useAppForm({
    ...wizardFormOpts,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: applicationSchema,
    },
    onSubmit: async ({ value }) => {
     
      const data = buildApplicationFormData(value as ApplicationFormData )
     
    await createTeacherApp({data})
    form.reset()
    navigate({ to: '/login' })
    
    },
  })

  const current = steps[step]
  const progress = ((step + 1) / steps.length) * 100

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-muted/40">
      <StepsSidebar steps={steps} currentStep={step} />
      <main className="flex-1 flex justify-center px-6 py-12 lg:py-20">
        <div className="w-full">
          <div className="mb-6 h-1 w-full rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <Link to="/">
            <Button variant={"link"} className="mb-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <span>
              Etapa {step + 1} de {steps.length}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            {current.title}
          </h1>
          <Card
            key={step}
            className="mt-6 border-border/60 shadow-sm shadow-black/3 animate-in fade-in slide-in-from-bottom-1 duration-300"
          >
            <CardContent className="p-6 lg:p-8">
              {step === 0 && (
                <PersonalStep form={form} step={step} setStep={setStep} />
              )}
              {step === 1 && (
                <AcademicStep form={form} step={step} setStep={setStep} />
              )}
              {step === 2 && (
                <TeachingExperienceStep form={form} step={step} setStep={setStep} />
              )}
              {step === 3 && (
                <DocumentsStep form={form} step={step} setStep={setStep} />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
