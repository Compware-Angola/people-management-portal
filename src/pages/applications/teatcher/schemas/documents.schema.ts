import { z } from 'zod'

export const documentsSchema = z.object({
  identificationDocument: z.string().min(1, 'BI/Passaporte é obrigatório'),
  courseCertificate: z.string().min(1, 'Certificado INAREES é obrigatório'),
  certificates: z.array(z.string()).min(1, 'Diplomas são obrigatórios'),
  cv: z.string().min(1, 'Currículo é obrigatório'),
  pedagogicalAggregation: z
    .string()
    .min(1, 'Agregação Pedagógica é obrigatória'),
})

export type DocumentsFormData = z.infer<typeof documentsSchema>
