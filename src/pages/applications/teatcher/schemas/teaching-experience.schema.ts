import z from "zod";

export const teachingExperienceItemSchema =  z.object({
        course: z.string().min(1, 'Curso é obrigatório'),
        institution: z.string().min(1, 'Instituição é obrigatória'),
        discipline: z.string().min(1, 'Disciplina/Atividade é obrigatória'),
        startYear: z.string().min(1, 'Ano de início é obrigatório'),
        endYear: z.string().min(1, 'Ano de início é obrigatório').or(z.literal("")),
      })

export const teachingExperienceSchema = z.array(teachingExperienceItemSchema)

export type TeachingExperienceItem = z.infer<typeof teachingExperienceItemSchema>

export type TeachingExperienceSchema = z.infer<typeof teachingExperienceSchema>