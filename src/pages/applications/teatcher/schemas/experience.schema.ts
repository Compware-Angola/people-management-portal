import { z } from 'zod'

export const professionalExperienceItemSchema = z.object({
  institution: z.string().trim().min(2, 'Instituição é obrigatória'),
  area: z.string().trim().min(2, 'Área é obrigatória'),
  role: z.string().trim().min(2, 'Função é obrigatória'),
  startYear: z.string().min(4, 'Ano de início é obrigatório'),
  endYear: z.string().min(4, "Ano de término é obrigatório").or(z.literal("")),
})

export const professionalExperienceSchema = z.array(
  professionalExperienceItemSchema,
)

export type ProfessionalExperienceItem = z.infer<
  typeof professionalExperienceItemSchema
>

export type ExperienceFormData = z.infer<typeof professionalExperienceSchema>
