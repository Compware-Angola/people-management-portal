import { z } from 'zod'

export const documentsSchema = z.object({
  identificationDocument: z.instanceof(File, {
    message: 'BI/Passaporte é obrigatório',
  }),
  courseCertificate: z
    .instanceof(File,
      { message: 'Certificado INAREES é obrigatório' },
    ),
  certificates: z.array(z.instanceof(File)).min(1, 'Diplomas são obrigatórios'),
  cv: z.instanceof(File, {
    message: 'Currículo é obrigatório',
  }),
  pedagogicalAggregation: z
    .instanceof(File, { message: 'Agregação Pedagógica é obrigatória' })

})

export type DocumentsFormData = z.infer<typeof documentsSchema>