import * as z from "zod";

export const signUpFormSchema = z.object({
  email: z
    .string({ required_error: "Email jest wymagany" })
    .email({ message: "Email jest nieprawidłowy" })
    .min(1, { message: "Email nie może być pusty" }),
  passwords: z
    .object({
      password: z
        .string({ required_error: "Hasło jest wymagane" })
        .min(8, { message: "Hasło musi mieć minimum 8 znaków" }),
      confirmPassword: z.string({ required_error: "Hasło jest wymagane" }),
    })
    .superRefine((data, ctx) => {
      const { password, confirmPassword } = data;
      if (password !== confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Hasła nie są identyczne",
          path: ["confirmPassword"],
        });
      }
    }),
});
