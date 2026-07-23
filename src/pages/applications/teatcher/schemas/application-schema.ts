import z from "zod";
import { personalSchema } from "./personal.schema";
import { academicSchema } from "./academic.schema";
import { documentsSchema } from "./documents.schema";
import { teachingExperienceSchema } from "./teaching-experience.schema";


export const applicationSchema = z.object({
  personal: personalSchema,
  academic: academicSchema,
  experience: teachingExperienceSchema,
  documents: documentsSchema,

});

export type ApplicationFormData = z.infer<typeof applicationSchema>;