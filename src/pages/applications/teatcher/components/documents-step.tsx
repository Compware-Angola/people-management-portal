import { withForm } from '@/components/forms'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { documentsSchema } from '../schemas/documents.schema'
import { wizardFormOpts } from '../utils'
import type { PublicVacancy } from '@/service/public-vacancies'
import {
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  FileText,
  Hash,
  Users,
} from 'lucide-react'

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

function formatDate(value: string | null | undefined) {
  if (!value) return '-'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'

  return date.toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function VacancySummary({
  vacancy,
  isLoading,
}: {
  vacancy?: PublicVacancy
  isLoading?: boolean
}) {
  if (isLoading) {
    return (
      <div className="rounded-xl border border-dashed bg-muted/30 p-5 text-sm text-muted-foreground">
        A carregar resumo da vaga...
      </div>
    )
  }

  if (!vacancy) {
    return (
      <div className="rounded-xl border border-dashed bg-muted/30 p-5 text-sm text-muted-foreground">
        Não foi possível carregar o resumo da vaga selecionada.
      </div>
    )
  }

  const position = getDescription(vacancy.position)
  const department = getDescription(vacancy.department)
  const hiringType = getDescription(vacancy.hiringType)
  const documents = vacancy.documents?.filter(
    (document) => document.description || document.originalName || document.type,
  )
  const details = [
    {
      label: 'Código da vaga',
      value: vacancy.code,
      icon: Hash,
    },
    {
      label: 'Departamento',
      value: department,
      icon: Building2,
    },
    {
      label: 'Data de publicação',
      value: formatDate(vacancy.publicationDate),
      icon: CalendarClock,
    },
    {
      label: 'Data de encerramento',
      value: formatDate(vacancy.closingDate),
      icon: CalendarClock,
    },
  ]

  return (
    <section className="overflow-hidden rounded-xl border bg-background">
      <div className="border-b bg-muted/30 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BriefcaseBusiness className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Vaga selecionada
              </p>
              <h2 className="mt-1 text-xl font-semibold leading-tight text-foreground">
                {position}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Confirme os dados abaixo antes de finalizar a candidatura.
              </p>
            </div>
          </div>

          <Badge variant="outline" className="h-7 rounded-md px-3">
            {vacancy.state?.acronym ?? 'Estado não informado'}
          </Badge>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Badge variant="secondary" className="h-7 rounded-md px-3">
            <Users className="h-3.5 w-3.5" />
            {vacancy.numberOfVacancies ?? '-'}{' '}
            {vacancy.numberOfVacancies === 1 ? 'vaga' : 'vagas'}
          </Badge>
          <Badge variant="secondary" className="h-7 rounded-md px-3">
            {hiringType}
          </Badge>
        </div>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <dl className="grid gap-3 sm:grid-cols-2">
          {details.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex gap-3 rounded-lg border p-3">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="mt-1 break-words text-sm font-medium text-foreground">
                  {value}
                </dd>
              </div>
            </div>
          ))}
        </dl>

        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">
              Documentos da vaga
            </h3>
          </div>

          {documents.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {documents.map((document, index) => (
                <li
                  key={`${document.originalName ?? document.description}-${index}`}
                  className="rounded-md bg-muted/40 px-3 py-2 text-sm text-muted-foreground"
                >
                  {document.description || document.originalName || document.type}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              Nenhum documento adicional informado para esta vaga.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export const DocumentsStep = withForm({
  ...wizardFormOpts,
  props: {
    step: 3,
    setStep: (_step: number) => { },
    vacancy: undefined as PublicVacancy | undefined,
    isLoadingVacancy: false,
  },
  render: function Render({ form, step, setStep, vacancy, isLoadingVacancy }) {
    return (
      <form.FormGroup
        name="documents"
        validators={{ onDynamic: documentsSchema }}
        onGroupSubmit={() => form.handleSubmit()}
      >
        {(formGroup) => (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              formGroup.handleSubmit()
            }}
            className="flex flex-col gap-6"
          >
            <VacancySummary vacancy={vacancy} isLoading={isLoadingVacancy} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <form.AppField name="documents.identificationDocument">
                {(field) => (
                  <field.FileField
                    label="BI/PASSAPORTE(*)"
                    accept=".pdf,.jpg,.png"

                    maxSizeMB={2}
                  />
                )}
              </form.AppField>
              <form.AppField name="documents.courseCertificate">
                {(field) => (
                  <field.FileField
                    label="Certificado INAREES (*)"
                    accept=".pdf,.jpg,.png"
                  />
                )}
              </form.AppField>


              <form.AppField name="documents.cv">
                {(field) => (
                  <field.FileField
                    label="Curriculum(*)"
                    accept=".pdf,.doc,.docx"
                  />
                )}
              </form.AppField>

              <form.AppField name="documents.pedagogicalAggregation">
                {(field) => (
                  <field.FileField
                    label="Agregação Pedagógica (*)"
                    accept=".pdf,.jpg,.png"
                  />
                )}
              </form.AppField>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <form.AppField name="documents.certificates">
                {(field) => (
                  <field.FileField
                    label="Diplomas(*)"
                    accept=".pdf,.jpg,.png"
                    multiple
                  />
                )}
              </form.AppField>

            </div>

            <div className="flex justify-between border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
              >
                Voltar
              </Button>

              <form.AppForm>
                <form.SubscribeButton label="Finalizar"  />
              </form.AppForm>
            </div>
          </form>
        )}
      </form.FormGroup>
    )
  },
})
