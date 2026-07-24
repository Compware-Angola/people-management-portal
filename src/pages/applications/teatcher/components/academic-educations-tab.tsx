import { useAppForm } from '@/components/forms'
import { Bookmark, BarChart3, Building2, Calendar, Trash2, Plus, GraduationCap } from 'lucide-react'
import { useAcademicDegreesQuery } from '@/hooks/academic-degrees'
import { useCourseTrainingAreas } from '@/hooks/course-training-areas'
import type { MyApplication } from '@/service/applications/applications.type'
import { z } from 'zod'
import { useUpdateAcademicEducations } from '@/hooks/application'
import { academicItemSchema } from '../schemas/academic.schema'

const academicListSchema = z.object({
  items: z.array(academicItemSchema),
})

const EMPTY_ITEM = {
  course: '',
  academicLevel: '',
  institution: '',
  completionYear: '',
}

interface AcademicEducationsTabProps {
  application: MyApplication
}

export function AcademicEducationsTab({
  application,
}: AcademicEducationsTabProps) {
  const updateMutation = useUpdateAcademicEducations(application.id)

  const form = useAppForm({
    defaultValues: {
      items: application.academicEducations.length
        ? application.academicEducations.map((item) => ({
            id: item.id,
            course: item.courseTrainingAreaId
              ? String(item.courseTrainingAreaId)
              : '',
            academicLevel: item.academicDegreeId
              ? String(item.academicDegreeId)
              : '',
            institution: item.institution ?? '',
            completionYear: item.graduationYear
              ? String(item.graduationYear)
              : '',
          }))
        : [EMPTY_ITEM],
    },
    validators: {
      onChange: academicListSchema,
    },
    onSubmit: async ({ value }) => {
      await updateMutation.mutateAsync(value.items)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="flex flex-col gap-6"
    >
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2 text-neutral-700">
          <GraduationCap className="size-5" />
          <h2 className="text-sm font-semibold">Formação Académica</h2>
        </div>

        <form.Field name="items" mode="array">
          {(itemsField) => (
            <button
              type="button"
              onClick={() => itemsField.pushValue(EMPTY_ITEM)}
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 active:bg-neutral-100"
            >
              <Plus className="size-3.5" />
              Adicionar
            </button>
          )}
        </form.Field>
      </div>

      <form.Field name="items" mode="array">
        {(itemsField) => (
          <div className="flex flex-col gap-4">
            {itemsField.state.value.map((_, index) => (
              <div
                key={index}
                className="group relative rounded-xl border border-neutral-200 bg-white p-4 pr-12 shadow-sm transition-shadow hover:shadow-md md:p-5 md:pr-14"
              >
                <span className="absolute -left-2 -top-2 flex size-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white shadow">
                  {index + 1}
                </span>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <form.AppField name={`items[${index}].course`}>
                    {(field) => (
                      <field.AsyncComboboxField
                        label="Curso"
                        placeholder="Selecione o curso"
                        icon={Bookmark}
                        useQuery={(search) => {
                          const query = useCourseTrainingAreas({
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

                  <form.AppField name={`items[${index}].academicLevel`}>
                    {(field) => (
                      <field.AsyncComboboxField
                        label="Nível académico"
                        placeholder="Selecione o nível"
                        icon={BarChart3}
                        useQuery={(search) => {
                          const query = useAcademicDegreesQuery({
                            search,
                            page: 1,
                            limit: 10,
                            status: 1,
                            ids: [2, 3],
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

                  <form.AppField name={`items[${index}].institution`}>
                    {(field) => (
                      <field.TextField label="Instituição" icon={Building2} />
                    )}
                  </form.AppField>

                  <form.AppField name={`items[${index}].completionYear`}>
                    {(field) => (
                      <field.TextField
                        label="Ano conclusão"
                        type="number"
                        icon={Calendar}
                      />
                    )}
                  </form.AppField>
                </div>

                {itemsField.state.value.length > 1 && (
                  <button
                    type="button"
                    onClick={() => itemsField.removeValue(index)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-red-400 opacity-0 transition-all hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 md:top-5 md:translate-y-0"
                    aria-label="Remover formação"
                  >
                    <Trash2 className="size-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </form.Field>

      <div className="flex justify-end border-t pt-4">
        <form.AppForm>
          <form.SubscribeButton
            label="Guardar alterações"
            disabled={updateMutation.isPending}
          />
        </form.AppForm>
      </div>
    </form>
  )
}