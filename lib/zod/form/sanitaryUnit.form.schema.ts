import * as z from "zod";
import { addressSchema } from "../address.schema";
import { contactSchema } from "../contact.schema";

export const sanitaryUnitFormSchema = z.object({
  name: z
    .string({ required_error: "Nazwa jest wymagana" })
    .min(1, { message: "Nazwa nie może być pusta" }),
  address: addressSchema,
  contact: contactSchema,
});
