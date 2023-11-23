import * as z from "zod";
import { contactSchema } from "../contact.schema";
import { personalSchema } from "../personal.schema";

export const reportFormSchema = z.object({
  personal: personalSchema,
  contact: contactSchema,
  disease: z
    .string({ required_error: "Choroba jest wymagana" })
    .min(1, { message: "Choroba nie może być pusta" }),
});
