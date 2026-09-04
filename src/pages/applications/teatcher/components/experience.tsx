import { withForm } from '@/components/forms'
import {
  BookOpen,
  Building2,
  ClipboardList,
  Calendar,
  Trash2,
  Plus,
  GraduationCap,
} from 'lucide-react'


import { useEnsureMinArrayItems } from '../hooks/use-ensure-min-array-items'
import { wizardFormOpts } from '../utils'
import { teachingExperienceSchema } from '../schemas/teaching-experience.schema'
import { cn } from '@/lib/utils'
import { useCreateMyProfessionalExperiences } from '@/hooks/professional-experiences'

const EMPTY_TEACHING_EXPERIENCE_ITEM = {
  course: '',
  institution: '',
  discipline: '',
  startYear: '',
  endYear: '',
}

function extractYear(value: string) {
  return Number(value.slice(0, 4))
}

export const TeachingExperienceStep = withForm({
  ...wizardFormOpts,
  props: {
    step: 2,
    setStep: (_step: number) => {},
  },
  render: function Render({ form, step, setStep }) {
    const createProfessionalExperiences = useCreateMyProfessionalExperiences()

    return (
      <form.FormGroup
        name="experience"
        validators={{ onDynamic: teachingExperienceSchema }}
        onGroupSubmit={async ({ value }) => {
          await createProfessionalExperiences.mutateAsync(
            value.map((item) => ({
              institution: item.institution,
              area: item.course,
              function: item.discipline,
              position: 'Docente',
              startYear: extractYear(item.startYear),
              ...(item.endYear ? { endYear: extractYear(item.endYear) } : {}),
            })),
          )
          setStep(step + 1)
        }}
      >
        {(teachingExperienceGroup) => (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              teachingExperienceGroup.handleSubmit()
            }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2 text-neutral-700">
                <GraduationCap className="size-5" />
                <h2 className="text-sm font-semibold">
                  Experiência como Docente
                </h2>
              </div>

              <form.Field name="experience" mode="array">
                {(teachingExperienceField) => (
                  <button
                    type="button"
                    disabled={teachingExperienceField.state.value.length >= 10}
                    onClick={() =>
                      teachingExperienceField.pushValue(
                        EMPTY_TEACHING_EXPERIENCE_ITEM,
                      )
                    }
                    className={cn("inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 active:bg-neutral-100", teachingExperienceField.state.value.length >= 10 && "opacity-50 cursor-not-allowed")}
                  >
                    <Plus className="size-3.5" />
                    Adicionar
                  </button>
                )}
              </form.Field>
            </div>

            <div className="flex items-start gap-2 rounded-md bg-blue-50 p-3 text-xs text-blue-700">
              <span>
                Obs.: Caso possua mais de uma experiência como docente, por
                favor clique no botão adicionar.
              </span>
            </div>

            <form.Field name="experience" mode="array">
              {(teachingExperienceField) => {
                useEnsureMinArrayItems(
                  teachingExperienceField,
                  EMPTY_TEACHING_EXPERIENCE_ITEM,
                )

                return (
                  <div className="flex flex-col gap-4">
                    {teachingExperienceField.state.value.map((_, index) => (
                      <div
                        key={index}
                        className="group relative rounded-xl border border-neutral-200 bg-white p-4 pr-12 shadow-sm transition-shadow hover:shadow-md md:p-5 md:pr-14"
                      >
                        <span className="absolute -left-2 -top-2 flex size-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white shadow">
                          {index + 1}
                        </span>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                          <form.AppField
                            name={`experience[${index}].course`}
                          >
                            {(field) => (

                                
                              <field.TextField label="Curso" icon={BookOpen} />
                            )}
                          </form.AppField>

                          <form.AppField
                            name={`experience[${index}].institution`}
                          >
                            {(field) => (
                              <field.TextField
                                label="Instituição"
                                icon={Building2}
                              />
                            )}
                          </form.AppField>

                          <form.AppField
                            name={`experience[${index}].discipline`}
                          >
                            {(field) => (
                              <field.TextField
                                label="Disciplina/Actividades"
                                icon={ClipboardList}
                              />
                            )}
                          </form.AppField>

                          <form.AppField
                            name={`experience[${index}].startYear`}
                          >
                            {(field) => (
                              <field.TextField
                                label="Ano de Início"
                                type="date"
                                icon={Calendar}
                              />
                            )}
                          </form.AppField>

                          <form.AppField
                            name={`experience[${index}].endYear`}
                          >
                            {(field) => (
                              <field.TextField
                                label="Ano de Fim"
                                type="date"
                                icon={Calendar}
                              />
                            )}
                          </form.AppField>
                        </div>

                        {teachingExperienceField.state.value.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              teachingExperienceField.removeValue(index)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-red-400 opacity-0 transition-all hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 md:top-5 md:translate-y-0"
                            aria-label="Remover experiência como docente"
                          >
                            <Trash2 className="size-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )
              }}
            </form.Field>

            <div className="flex col-span-full justify-between border-t pt-4">
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="rounded-md px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100"
              >
                Voltar
              </button>
              <form.AppForm>
                <form.SubscribeButton
                  label={
                    createProfessionalExperiences.isPending
                      ? 'A gravar...'
                      : 'Avançar'
                  }
                />
              </form.AppForm>
            </div>
          </form>
        )}
      </form.FormGroup>
    )
  },
})
