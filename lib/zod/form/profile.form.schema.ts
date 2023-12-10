import * as z from "zod";
import peselValidation from "../../helpers/peselValidation";
import { contactSchema } from "../contact.schema";
import { personalSchema } from "../personal.schema";
import { addressSchema } from "../address.schema";

export const profileFormSchema = z.object({
  contact: contactSchema,
  personal: personalSchema,
  address: addressSchema,
});
