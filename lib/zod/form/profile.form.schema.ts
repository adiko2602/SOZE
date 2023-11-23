import * as z from "zod";
import peselValidation from "../../helpers/peselValidation";
import { contactSchema } from "../contact.schema";

export const profilerofileFormSchema = z.object({
  firstName: z
    .string({ required_error: "Imię jest wymagane" })
    .min(1, { message: "Imię nie może być puste" }),
  lastName: z
    .string({ required_error: "Nazwisko jest wymagane" })
    .min(1, { message: "Nazwisko nie może być puste" }),
  pesel: z
    .string({ required_error: "PESEL jest wymagany" })
    .length(11, { message: "PESEL musi mieć 11 cyfr" })
    .refine(
      (pesel) => {
        const regex = /^\d+$/;
        return regex.test(pesel);
      },
      { message: "PESEL musi składać się tylko z cyfr" }
    )
    .refine(
      (pesel) => {
        return peselValidation(pesel);
      },
      { message: "PESEL jest nieprawidłowy" }
    ),
  contact: contactSchema,
});
