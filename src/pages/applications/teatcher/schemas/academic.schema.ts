import { z } from 'zod'

export const academicItemSchema = z.object({
  course: z.string().min(1, 'Curso é obrigatório'),

  academicLevel: z.string().min(1, 'Nível académico é obrigatório'),

  institution: z.string().trim().min(2, 'Instituição é obrigatória'),

  completionYear: z
    .string()
    .min(4, 'Ano de conclusão é obrigatório')
    .regex(/^\d{4}$/, 'Ano inválido'),
})

export const academicSchema = z
  .array(academicItemSchema)
  .min(1, 'Adicione pelo menos uma formação académica')

export type AcademicItem = z.infer<typeof academicItemSchema>

export type AcademicFormData = z.infer<typeof academicSchema>
