import * as z from "zod";

export const contactSchema = z.object({
  phoneNumber: z
    .string({ required_error: "Numer telefonu jest wymagany" })
    .min(1, { message: "Numer telefonu nie może być pusty" })
    .refine(
      (phoneNumber) => {
        const regex = /^\d+$/;
        if (phoneNumber.length === 0) return true;
        return regex.test(phoneNumber);
      },
      { message: "Numer telefonu musi składać się tylko z cyfr" }
    ),
  email: z.string().email({ message: "Email jest nieprawidłowy" }).optional(),
});
