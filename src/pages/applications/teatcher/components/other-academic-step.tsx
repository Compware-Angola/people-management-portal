import { withForm } from '@/components/forms'
import {
  Building2,
  Layers,
  User as UserIcon,
  Calendar,
  Trash2,
  Plus,
  Briefcase,
} from 'lucide-react'

import { professionalExperienceSchema } from '../schemas/experience.schema'
import { useEnsureMinArrayItems } from '../hooks/use-ensure-min-array-items'
import { wizardFormOpts } from '../utils'

const EMPTY_EXPERIENCE_ITEM = {
  institution: '',
  area: '',
  role: '',
  startYear: '',
  endYear: "",
}

export const ExperienceStep = withForm({
  ...wizardFormOpts,
  props: {
    step: 2,
    setStep: (_step: number) => { },
  },
  render: function Render({ form, step, setStep }) {
    return (
      <form.FormGroup
        name="experience"
        validators={{ onDynamic: professionalExperienceSchema }}
        onGroupSubmit={() => setStep(step + 1)}
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
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2 text-neutral-700">
                <Briefcase className="size-5" />
                <h2 className="text-sm font-semibold">Experiência Profissional</h2>
              </div>

              <form.Field name="experience" mode="array">
                {(experienceField) => (
                  <button
                    type="button"
                    onClick={() => experienceField.pushValue(EMPTY_EXPERIENCE_ITEM)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 active:bg-neutral-100"
                  >
                    <Plus className="size-3.5" />
                    Adicionar
                  </button>
                )}
              </form.Field>
            </div>

            <form.Field name="experience" mode="array">
              {(experienceField) => {
                useEnsureMinArrayItems(experienceField, EMPTY_EXPERIENCE_ITEM)

                return (
                  <div className="flex flex-col gap-4">
                    {experienceField.state.value.map((_, index) => (
                      <div
                        key={index}
                        className="group relative rounded-xl border border-neutral-200 bg-white p-4 pr-12 shadow-sm transition-shadow hover:shadow-md md:p-5 md:pr-14"
                      >
                        <span className="absolute -left-2 -top-2 flex size-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white shadow">
                          {index + 1}
                        </span>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                          <form.AppField name={`experience[${index}].institution`}>
                            {(field) => (
                              <field.TextField
                                label="Instituição"
                                icon={Building2}
                              />
                            )}
                          </form.AppField>

                          <form.AppField name={`experience[${index}].area`}>
                            {(field) => (
                              <field.TextField label="Área" icon={Layers} />
                            )}
                          </form.AppField>

                          <form.AppField name={`experience[${index}].role`}>
                            {(field) => (
                              <field.TextField label="Função" icon={UserIcon} />
                            )}
                          </form.AppField>

                          <form.AppField name={`experience[${index}].startYear`}>
                            {(field) => (
                              <field.TextField
                                label="Ano de Início"
                                type="date"
                                icon={Calendar}
                              />
                            )}
                          </form.AppField>

                          <form.AppField name={`experience[${index}].endYear`}>
                            {(field) => (
                              <field.TextField
                                label="Ano de Fim"
                                type="date"
                                icon={Calendar}
                              />
                            )}
                          </form.AppField>
                        </div>

                        {experienceField.state.value.length > 1 && (
                          <button
                            type="button"
                            onClick={() => experienceField.removeValue(index)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-red-400 opacity-0 transition-all hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 md:top-5 md:translate-y-0"
                            aria-label="Remover experiência"
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

            {/* Ações */}
            <div className="flex col-span-full justify-between border-t pt-4">
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="rounded-md px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100"
              >
                Voltar
              </button>
              <form.AppForm>
                <form.SubscribeButton label="Avançar" />
              </form.AppForm>
            </div>
          </form>
        )}
      </form.FormGroup>
    )
  },
})