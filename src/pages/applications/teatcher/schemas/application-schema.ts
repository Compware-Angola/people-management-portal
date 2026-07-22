import z from "zod";
import { personalSchema } from "./personal.schema";
import { academicSchema } from "./academic.schema";
import { professionalExperienceSchema } from "./experience.schema";
import { documentsSchema } from "./documents.schema";


export const applicationSchema = z.object({
  personal: personalSchema,
  academic: academicSchema,
  experience: professionalExperienceSchema,
  documents: documentsSchema,

});

export type ApplicationFormData = z.infer<typeof applicationSchema>;