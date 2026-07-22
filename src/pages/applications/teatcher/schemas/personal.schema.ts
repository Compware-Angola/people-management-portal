import z from "zod";

export const personalSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, 'Nome completo é obrigatório'),

  maritalStatus: z
    .string()
    .min(1, 'Estado civil é obrigatório'),

  gender: z
    .string()
    .min(1, 'Gênero é obrigatório'),

  birthDate: z
    .string()
    .min(1, 'Data de nascimento é obrigatória'),

  documentType: z
    .string()
    .min(1, 'Tipo de documento é obrigatório'),

  documentNumber: z
    .string()
    .trim()
    .min(3, 'Número do documento obrigatório')
    .max(30, 'Número do documento muito longo')
    .regex(
      /^[A-Za-z0-9]+$/,
      'O documento deve conter apenas letras e números'
    ),

  documentExpiration: z
    .string()
    .min(1, 'Data de validade é obrigatória'),

  nationality: z
    .string()
    .min(1, 'Nacionalidade é obrigatória'),

  phone: z
    .string()
    .min(9, 'Telefone inválido'),

  alternativePhone: z.string()
    .min(9, 'Telefone inválido')
    .or(z.literal("")),


  email: z
    .email('E-mail inválido'),

  address: z
    .string()
    .trim()
    .min(5, 'Endereço é obrigatório')
})

export type PersonalFormData = z.infer<typeof personalSchema>