import { withForm } from '@/components/forms'

import {
  Bookmark,
  BarChart3,
  Building2,
  Calendar,
  Trash2,
  Plus,
  GraduationCap,
} from 'lucide-react'
import { useAcademicDegreesQuery } from '@/hooks/academic-degrees'
import { useCourseTrainingAreas } from '@/hooks/course-training-areas'
import { academicSchema } from '../schemas/academic.schema'
import { useEnsureMinArrayItems } from '../hooks/use-ensure-min-array-items'
import { wizardFormOpts } from '../utils'

const EMPTY_ACADEMIC_ITEM = {
  course: '',
  academicLevel: '',
  institution: '',
  completionYear: '',
}

export const AcademicStep = withForm({
  ...wizardFormOpts,
  props: {
    step: 1,
    setStep: (_step: number) => { },
  },
  render: function Render({ form, step, setStep }) {
    const coursesQuery = useCourseTrainingAreas
    const academicDegreesQuery = useAcademicDegreesQuery
    return (
      <form.FormGroup
        name="academic"
        validators={{ onDynamic: academicSchema }}
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
                <GraduationCap className="size-5" />
                <h2 className="text-sm font-semibold">Formação Académica</h2>
              </div>

              <form.Field name="academic" mode="array">
                {(academicField) => (
                  <button
                    type="button"
                    onClick={() => academicField.pushValue(EMPTY_ACADEMIC_ITEM)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 active:bg-neutral-100"
                  >
                    <Plus className="size-3.5" />
                    Adicionar
                  </button>
                )}
              </form.Field>
            </div>
            <form.Field name="academic" mode="array">
              {(academicField) => {
                useEnsureMinArrayItems(academicField, EMPTY_ACADEMIC_ITEM)

                return (
                  <div className="flex flex-col gap-4">
                    {academicField.state.value.map((_, index) => (
                      <div
                        key={index}
                        className="group relative rounded-xl border border-neutral-200 bg-white p-4 pr-12 shadow-sm transition-shadow hover:shadow-md md:p-5 md:pr-14"
                      >
                        <span className="absolute -left-2 -top-2 flex size-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white shadow">
                          {index + 1}
                        </span>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                          <form.AppField name={`academic[${index}].course`}>
                            {(field) => (
                              <field.AsyncComboboxField
                                label="Curso"
                                placeholder="Selecione o curso"
                                icon={Bookmark}
                                useQuery={(search) => {
                                  const query = coursesQuery({
                                    search,
                                    page: 1,
                                    limit: 10,
                                  })

                                  return {
                                    data:
                                      query.data?.map((item) => ({
                                        label: item.description,
                                        value: String(item.id),
                                      })) ?? [],
                                    isLoading: query.isLoading,
                                  }
                                }}
                              />
                            )}
                          </form.AppField>

                          <form.AppField
                            name={`academic[${index}].academicLevel`}
                          >
                            {(field) => (
                              <field.AsyncComboboxField
                                label="Nível académico"
                                placeholder="Selecione o nível"
                                icon={BarChart3}
                                useQuery={(search) => {
                                  const query = academicDegreesQuery({
                                    search,
                                    page: 1,
                                    limit: 10,
                                    status: 1,
                                  })

                                  return {
                                    data:
                                      query.data?.map((item) => ({
                                        label: item.description,
                                        value: String(item.id),
                                      })) ?? [],
                                    isLoading: query.isLoading,
                                  }
                                }}
                              />
                            )}
                          </form.AppField>

                          <form.AppField name={`academic[${index}].institution`}>
                            {(field) => (
                              <field.TextField
                                label="Instituição"
                                icon={Building2}
                              />
                            )}
                          </form.AppField>

                          <form.AppField
                            name={`academic[${index}].completionYear`}
                          >
                            {(field) => (
                              <field.TextField
                                label="Ano conclusão"
                                type="number"
                                icon={Calendar}
                              />
                            )}
                          </form.AppField>
                        </div>

                        {academicField.state.value.length > 1 && (
                          <button
                            type="button"
                            onClick={() => academicField.removeValue(index)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-red-400 opacity-0 transition-all hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 md:top-5 md:translate-y-0"
                            aria-label="Remover formação"
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