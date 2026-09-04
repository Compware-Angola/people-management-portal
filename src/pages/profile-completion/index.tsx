import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import {
  Calendar,
  Flag,
  IdCardIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from 'lucide-react'

import { useAppForm } from '@/components/forms'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { useGendersQuery } from '@/hooks/genders'
import { useMaritalStatusQuery } from '@/hooks/marital-status'
import { useNationalitiesQuery } from '@/hooks/nationalities'
import {
  useMyUserCollaborator,
  useUpdateMyUserCollaborator,
} from '@/hooks/user-collaborators'

const profileCompletionSchema = z.object({
  fullName: z.string().trim().min(3, 'Nome completo é obrigatório'),
  email: z.email('E-mail inválido'),
  username: z.string().trim().min(3, 'Nome de utilizador é obrigatório'),
  identityDocument: z
    .string()
    .trim()
    .min(3, 'Número do documento é obrigatório')
    .max(50, 'Número do documento muito longo'),
  taxIdentificationNumber: z.string().trim().max(50).optional(),
  phone: z.string().trim().min(9, 'Telefone inválido'),
  alternativePhone: z.string().trim().max(30).optional(),
  motherName: z.string().trim().min(3, 'Nome da mãe é obrigatório'),
  fatherName: z.string().trim().min(3, 'Nome do pai é obrigatório'),
  nationalityId: z.string().min(1, 'Nacionalidade é obrigatória'),
  maritalStatusId: z.string().min(1, 'Estado civil é obrigatório'),
  genderId: z.string().min(1, 'Género é obrigatório'),
  birthDate: z.string().min(1, 'Data de nascimento é obrigatória'),
  documentIssueDate: z.string().min(1, 'Data de emissão é obrigatória'),
  documentExpirationDate: z.string().min(1, 'Data de expiração é obrigatória'),
})

type ProfileCompletionFormValues = z.infer<typeof profileCompletionSchema>

const initialValues: ProfileCompletionFormValues = {
  fullName: '',
  email: '',
  username: '',
  identityDocument: '',
  taxIdentificationNumber: '',
  phone: '',
  alternativePhone: '',
  motherName: '',
  fatherName: '',
  nationalityId: '',
  maritalStatusId: '',
  genderId: '',
  birthDate: '',
  documentIssueDate: '',
  documentExpirationDate: '',
}

function toInputDate(value?: string | null) {
  if (!value) return ''
  return value.split('T')[0] ?? ''
}

function optionalString(value?: string) {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

export function ProfileCompletionPage() {
  const navigate = useNavigate()
  const { data: collaborator, isLoading, isError } = useMyUserCollaborator()
  const updateMutation = useUpdateMyUserCollaborator()
  const gendersQuery = useGendersQuery
  const maritalStatusQuery = useMaritalStatusQuery
  const nationalitiesQuery = useNationalitiesQuery

  const form = useAppForm({
    defaultValues: initialValues,
    validators: {
      onChange: profileCompletionSchema,
    },
    onSubmit: async ({ value }) => {
      if (!collaborator) return

      await updateMutation.mutateAsync({
        fullName: value.fullName,
        email: value.email,
        username: value.username,
        identityDocument: value.identityDocument,
        taxIdentificationNumber: optionalString(value.taxIdentificationNumber),
        phone: value.phone,
        alternativePhone: optionalString(value.alternativePhone),
        motherName: value.motherName,
        fatherName: value.fatherName,
        nationalityId: Number(value.nationalityId),
        maritalStatusId: Number(value.maritalStatusId),
        genderId: Number(value.genderId),
        birthDate: value.birthDate,
        documentIssueDate: value.documentIssueDate,
        documentExpirationDate: value.documentExpirationDate,
      })

      navigate({ to: '/dashboard' })
    },
  })

  useEffect(() => {
    if (!collaborator?.person) return

    form.reset({
      fullName: collaborator.person.name ?? '',
      email: collaborator.email ?? '',
      username: collaborator.username ?? '',
      identityDocument: collaborator.person.identityDocument ?? '',
      taxIdentificationNumber:
        collaborator.person.taxIdentificationNumber ?? '',
      phone: collaborator.person.phone ?? '',
      alternativePhone: collaborator.person.alternativePhone ?? '',
      motherName: collaborator.person.motherName ?? '',
      fatherName: collaborator.person.fatherName ?? '',
      nationalityId: collaborator.person.nationalityId
        ? String(collaborator.person.nationalityId)
        : '',
      maritalStatusId: collaborator.person.maritalStatusId
        ? String(collaborator.person.maritalStatusId)
        : '',
      genderId: collaborator.person.genderId
        ? String(collaborator.person.genderId)
        : '',
      birthDate: toInputDate(collaborator.person.birthDate),
      documentIssueDate: toInputDate(collaborator.person.documentIssueDate),
      documentExpirationDate: toInputDate(
        collaborator.person.documentExpirationDate,
      ),
    })
  }, [collaborator, form])

  if (isLoading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <Spinner className="size-6" />
      </div>
    )
  }

  if (isError || !collaborator) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Não foi possível carregar o perfil</CardTitle>
          <CardDescription>
            Atualize a página ou tente iniciar sessão novamente.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Completar perfil
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Confirme os dados já existentes e preencha as informações em falta.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados do colaborador</CardTitle>
          <CardDescription>
            Estas informações serão associadas à sua conta no portal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            className="space-y-8"
          >
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <form.AppField name="fullName">
                {(field) => (
                  <field.TextField label="Nome completo" icon={UserIcon} />
                )}
              </form.AppField>

              <form.AppField name="email">
                {(field) => <field.EmailField label="Email" icon={MailIcon} />}
              </form.AppField>

              <form.AppField name="username">
                {(field) => (
                  <field.TextField
                    label="Nome de utilizador"
                    icon={UserIcon}
                  />
                )}
              </form.AppField>

              <form.AppField name="genderId">
                {(field) => (
                  <field.AsyncComboboxField
                    label="Género"
                    placeholder="Selecione o género"
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

              <form.AppField name="birthDate">
                {(field) => (
                  <field.TextField
                    label="Data de nascimento"
                    type="date"
                    icon={Calendar}
                  />
                )}
              </form.AppField>

              <form.AppField name="maritalStatusId">
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

              <form.AppField name="nationalityId">
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

              <form.AppField name="identityDocument">
                {(field) => (
                  <field.TextField
                    label="Número do documento"
                    icon={IdCardIcon}
                  />
                )}
              </form.AppField>

              <form.AppField name="taxIdentificationNumber">
                {(field) => <field.TextField label="NIF" icon={IdCardIcon} />}
              </form.AppField>

              <form.AppField name="documentIssueDate">
                {(field) => (
                  <field.TextField
                    label="Data de emissão"
                    type="date"
                    icon={Calendar}
                  />
                )}
              </form.AppField>

              <form.AppField name="documentExpirationDate">
                {(field) => (
                  <field.TextField
                    label="Data de expiração"
                    type="date"
                    icon={Calendar}
                  />
                )}
              </form.AppField>

              <form.AppField name="phone">
                {(field) => (
                  <field.TextField label="Telefone principal" icon={PhoneIcon} />
                )}
              </form.AppField>

              <form.AppField name="alternativePhone">
                {(field) => (
                  <field.TextField
                    label="Telefone alternativo"
                    icon={PhoneIcon}
                  />
                )}
              </form.AppField>

              <form.AppField name="motherName">
                {(field) => (
                  <field.TextField label="Nome da mãe" icon={UserIcon} />
                )}
              </form.AppField>

              <form.AppField name="fatherName">
                {(field) => (
                  <field.TextField label="Nome do pai" icon={UserIcon} />
                )}
              </form.AppField>
            </div>

            <form.AppForm>
              <form.SubscribeButton
                label="Guardar dados"
                className="w-full md:w-auto"
                disabled={updateMutation.isPending}
              />
            </form.AppForm>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
