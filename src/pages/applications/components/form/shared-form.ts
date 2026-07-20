import { formOptions } from "@tanstack/react-form";
import { z } from "zod";

export const personalSchema = z.object({
    fullName: z.string().min(3, "Nome obrigatório"),
    birthDate: z.string().min(1, "Data de nascimento obrigatória"),
    nationality: z.string().min(1, "Nacionalidade obrigatória"),
});

export const contactSchema = z.object({
    email: z.email("Email inválido"),
    phone: z.string().min(9, "Telefone inválido"),
    address: z.string().min(5, "Morada obrigatória"),
});

export const documentsSchema = z.object({
    cv: z.instanceof(File, { message: "Currículo obrigatório" }),
    identificationDocument: z.instanceof(File, {
        message: "Documento de identificação obrigatório",
    }),
    certificates: z.array(z.instanceof(File)),
});

export const applicationSchema = z.object({
    personal: personalSchema,
    contact: contactSchema,
    documents: documentsSchema,
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

export const wizardFormOpts = formOptions({
    defaultValues: {
        personal: {
            fullName: "",
            birthDate: "",
            nationality: "",
        },
        contact: {
            email: "",
            phone: "",
            address: "",
        },
        documents: {
            cv: undefined as File | undefined,
            identificationDocument: undefined as File | undefined,
            certificates: [] as File[],
        },
    },
});