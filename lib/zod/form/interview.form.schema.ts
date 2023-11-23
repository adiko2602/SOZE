import * as z from "zod";
import { personalSchema } from "../personal.schema";
import { contactSchema } from "../contact.schema";
import { addressSchema } from "../address.schema";

export const interviewFormSchema = z.object({
  personal: personalSchema,
  contact: contactSchema,
  address: addressSchema,
  quarantine: z.string().optional(),
  isolation: z.string().optional(),
});
