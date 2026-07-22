import { useState } from 'react'
import { revalidateLogic } from '@tanstack/react-form'
import { Card, CardContent } from '@/components/ui/card'
import { useAppForm } from '@/components/forms'

import { StepsSidebar } from '../components/StepsSidebar'
import { PersonalStep } from './components/personal-step'
import { AcademicStep } from './components/academic-Step'
import { ExperienceStep } from './components/experience-step'
import { applicationSchema} from './schemas/application-schema'
import type {ApplicationFormData} from './schemas/application-schema';
import { DocumentsStep } from './components/documents-step'

import { buildApplicationFormData, wizardFormOpts } from './utils'
import { useCreateTeacherApplication } from '@/hooks/application'

const steps = [
  { title: 'Dados pessoais' },
  { title: 'Formação académica' },
  { title: 'Experiência profissional/Docente' },
  { title: 'Anexar Documentos' },
]

export function TeatcherApplicationPage() {
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
       console.log(data)
    await createTeacherApp({data})
     
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
            className="mt-6 border-border/60 shadow-sm shadow-black/[0.03] animate-in fade-in slide-in-from-bottom-1 duration-300"
          >
            <CardContent className="p-6 lg:p-8">
              {step === 0 && (
                <PersonalStep form={form} step={step} setStep={setStep} />
              )}
              {step === 1 && (
                <AcademicStep form={form} step={step} setStep={setStep} />
              )}
              {step === 2 && (
                <ExperienceStep form={form} step={step} setStep={setStep} />
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
