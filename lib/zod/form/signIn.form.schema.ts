import * as z from "zod";

export const signInFormSchema = z.object({
  email: z
    .string({ required_error: "Email jest wymagany" })
    .email({ message: "Email jest nieprawidłowy" })
    .min(1, { message: "Email nie może być pusty" }),
  password: z
    .string({ required_error: "Hasło jest wymagane" })
    .min(1, { message: "Hasło nie może być puste" }),
});
