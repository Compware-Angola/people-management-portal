import { formOptions } from '@tanstack/react-form'
import { z } from 'zod'

export const personalSchema = z.object({
    fullName: z.string().trim().min(3, 'Nome completo é obrigatório'),

    maritalStatus: z.string().min(1, 'Estado civil é obrigatório'),

    gender: z.string().min(1, 'Gênero é obrigatório'),

    birthDate: z.string().min(1, 'Data de nascimento é obrigatória'),

    documentType: z.string().min(1, 'Tipo de documento é obrigatório'),

    documentNumber: z
        .string()
        .trim()
        .min(3, 'Número do documento obrigatório')
        .max(30, 'Número do documento muito longo')
        .regex(/^[A-Za-z0-9]+$/, 'O documento deve conter apenas letras e números'),

    documentExpiration: z.string().min(1, 'Data de validade é obrigatória'),

    nationality: z.string().min(1, 'Nacionalidade é obrigatória'),

    phone: z.string().min(9, 'Telefone inválido'),
    alternativePhone: z.string().or(z.undefined()),
    email: z.email('E-mail inválido'),

    address: z.string().trim().min(5, 'Endereço é obrigatório'),
})

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

export const documentsSchema = z.object({
    cv: z.instanceof(File, { message: 'Currículo obrigatório' }),
    identificationDocument: z.instanceof(File, {
        message: 'Documento de identificação obrigatório',
    }),
    certificates: z.array(z.instanceof(File)),
})

export const teachingExperienceItemSchema = z.object({
    course: z.string().min(1, "Curso é obrigatório"),
    institution: z.string().trim().min(2, "Instituição é obrigatória"),
    subject: z.string().trim().min(2, "Disciplina/Actividade é obrigatória"),
    startYear: z.string().min(1, "Ano de início é obrigatório"),
    endYear: z.string().or(z.undefined()),
});

export const teachingExperienceSchema = z.array(teachingExperienceItemSchema);

export type TeachingExperienceItem = z.infer<typeof teachingExperienceItemSchema>

export const professionalExperienceItemSchema = z.object({
    institution: z.string().trim().min(2, "Instituição é obrigatória"),
    area: z.string().trim().min(2, "Área é obrigatória"),
    role: z.string().trim().min(2, "Função é obrigatória"),
    startYear: z.string().min(1, "Ano de início é obrigatório"),
    endYear: z.string().or(z.undefined()),
});

export const professionalExperienceSchema = z.array(
    professionalExperienceItemSchema
);

export type ProfessionalExperienceItem = z.infer<typeof professionalExperienceItemSchema>

export const experienceSchema = z.object({
    teaching: teachingExperienceSchema,
    professional: professionalExperienceSchema,
});

export const applicationSchema = z.object({
    personal: personalSchema,
    academic: academicSchema,
    experience: experienceSchema,
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

export const wizardFormOpts = formOptions({
    defaultValues: {
        personal: {
            fullName: "",
            maritalStatus: "",
            gender: "",
            birthDate: "",
            documentType: "",
            documentNumber: "",
            documentExpiration: "",
            nationality: "",
            phone: "",
            email: "",
            address: "",
            alternativePhone: undefined as string | undefined,
        },
        academic: [
            {
                course: "",
                academicLevel: "",
                institution: "",
                completionYear: "",
            },
        ] as AcademicItem[],
        experience: {
            teaching: [] as TeachingExperienceItem[],
            professional: [] as ProfessionalExperienceItem[],
        },
        // documents: {
        //     cv: undefined as File | undefined,
        //     identificationDocument: undefined as File | undefined,
        //     certificates: [] as File[],
        // },
    },
});