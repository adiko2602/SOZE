import * as z from "zod";

export const addressSchema = z.object({
  countryName: z
    .string({ required_error: "Państwo jest wymagane" })
    .min(1, { message: "Państwo nie może być puste" }),
  state: z
    .string({ required_error: "Województwo jest wymagane" })
    .min(1, { message: "Województwo nie może być puste" }),
  postalCode: z
    .string({ required_error: "Kod pocztowy jest wymagany" })
    .min(1, { message: "Kod pocztowy nie może być pusty" }),
  city: z
    .string({ required_error: "Misato jest wymagane" })
    .min(1, { message: "Misato nie może być puste" }),
  street: z.string().optional(),
  houseNumber: z
    .string({ required_error: "Numer domu jest wymagany" })
    .min(1, { message: "Numer domu nie może być pusty" }),
  apartmentNumber: z.string().optional(),
});
