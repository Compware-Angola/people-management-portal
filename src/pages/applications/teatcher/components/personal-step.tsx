import { withForm } from '@/components/forms'
import {
  Calendar,
  Flag,
  Locate,
  MailIcon,
  PhoneIcon,
  UserIcon,
  IdCardIcon,
} from 'lucide-react'
import { useMaritalStatusQuery } from '@/hooks/marital-status'
import { useDocumentTypesQuery } from '@/hooks/document-types'
import { useGendersQuery } from '@/hooks/genders'
import { useNationalitiesQuery } from '@/hooks/nationalities'

import { personalSchema } from '../schemas/personal.schema'
import { Header } from './header'
import { wizardFormOpts } from '../utils'

export const PersonalStep = withForm({
  ...wizardFormOpts,

  props: {
    step: 0,
    setStep: (_step: number) => { },
  },
  render: function Render({ form, step, setStep }) {
    const maritalStatusQuery = useMaritalStatusQuery
    const documentTypesQuery = useDocumentTypesQuery
    const gendersQuery = useGendersQuery
    const nationalitiesQuery = useNationalitiesQuery

    return (
      <form.FormGroup
        name="personal"
        validators={{ onDynamic: personalSchema }}
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
            <Header title="Dados Pessoais" icon={UserIcon} />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <form.AppField name="personal.fullName">
                {(field) => (
                  <field.TextField label="Nome completo" icon={UserIcon} />
                )}
              </form.AppField>
              <form.AppField name="personal.gender">
                {(field) => (
                  <field.AsyncComboboxField
                    label="Gênero"
                    placeholder="Selecione o gênero"
                    icon={UserIcon}
                    useQuery={(search) => {
                      const query = gendersQuery({
                        search,
                        page: 1,
                        limit: 10,
                      })

                      return {
                        data:
                          query.data?.map((gender) => ({
                            label: gender.description,
                            value: String(gender.id),
                          })) ?? [],

                        isLoading: query.isLoading,
                      }
                    }}
                  />
                )}
              </form.AppField>
              <form.AppField name="personal.birthDate">
                {(field) => (
                  <field.TextField
                    label="Data nascimento"
                    type="date"
                    icon={Calendar}
                  />
                )}
              </form.AppField>
              <form.AppField name="personal.maritalStatus">
                {(field) => (
                  <field.AsyncComboboxField
                    label="Estado civil"
                    placeholder="Selecione o estado civil"
                    icon={UserIcon}
                    useQuery={(search) => {
                      const query = maritalStatusQuery({
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

              <form.AppField name="personal.nationality">
                {(field) => (
                  <field.AsyncComboboxField
                    label="Nacionalidade"
                    placeholder="Selecione a nacionalidade"
                    icon={Flag}
                    useQuery={(search) => {
                      const query = nationalitiesQuery({
                        search,
                        page: 1,
                        limit: 10,
                      })

                      return {
                        data:
                          query.data?.map((nationality) => ({
                            label: nationality.description,
                            value: String(nationality.id),
                          })) ?? [],

                        isLoading: query.isLoading,
                      }
                    }}
                  />
                )}
              </form.AppField>

              <form.AppField name="personal.documentType">
                {(field) => (
                  <field.AsyncComboboxField
                    label="Tipo de documento"
                    placeholder="Selecione o documento"
                    icon={IdCardIcon}
                    useQuery={(search) => {
                      const query = documentTypesQuery({
                        search,
                        page: 1,
                        limit: 10,
                        ids: [1, 2],
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

              <form.AppField name="personal.documentNumber">
                {(field) => (
                  <field.TextField
                    label="Número do documento"
                    icon={IdCardIcon}
                  />
                )}
              </form.AppField>

              <form.AppField name="personal.documentExpiration">
                {(field) => (
                  <field.TextField
                    label="Data de validade"
                    type="date"
                    icon={Calendar}
                  />
                )}
              </form.AppField>

              {/* CONTACTO */}
              <form.AppField name="personal.phone">
                {(field) => (
                  <field.TextField label="Telefone principal" icon={PhoneIcon} />
                )}
              </form.AppField>

              <form.AppField name="personal.alternativePhone">
                {(field) => (
                  <field.TextField
                    label="Telefone alternativo"
                    icon={PhoneIcon}
                  />
                )}
              </form.AppField>

              <form.AppField name="personal.email">
                {(field) => <field.EmailField label="Email" icon={MailIcon} />}
              </form.AppField>

              {/* MORADA */}
              <form.AppField name="personal.address">
                {(field) => <field.TextField label="Morada" icon={Locate} />}
              </form.AppField>
            </div>



            {/* ACTION */}
            <div className="flex col-span-full justify-end pt-4">
              <form.AppForm>
                <form.SubscribeButton label="Continuar" />
              </form.AppForm>
            </div>
          </form>
        )}
      </form.FormGroup>
    )
  },
})
