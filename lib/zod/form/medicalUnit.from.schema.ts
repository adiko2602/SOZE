import * as z from "zod";
import { addressSchema } from "../address.schema";
import { contactSchema } from "../contact.schema";

export const medicalUnitFormSchema = z.object({
  name: z
    .string({ required_error: "Nazwa jest wymagana" })
    .min(1, { message: "Nazwa nie może być pusta" }),
  sanitaryUnitId: z
    .string({ required_error: "Jednostka sanitarna jest wymagana" })
    .min(1, { message: "Jednostka sanitarna nie może być pusta" }),
  address: addressSchema,
  contact: contactSchema,
});
