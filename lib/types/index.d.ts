import * as z from "zod";
import { signInFormSchema } from "../zod/form/signIn.form.schema";
import { signUpFormSchema } from "../zod/form/signUp.form.schema";

export type TSignInForm = z.infer<typeof signInFormSchema>;
export type TSignUpForm = z.infer<typeof signUpFormSchema>;
