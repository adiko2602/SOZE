import * as z from "zod";
import { signInFormSchema } from "../zod/form/signIn.form.schema";
import { signUpFormSchema } from "../zod/form/signUp.form.schema";
import { profileFormSchema } from "../zod/form/profile.form.schema";

export type TSignInForm = z.infer<typeof signInFormSchema>;
export type TSignUpForm = z.infer<typeof signUpFormSchema>;
export type TProfileForm = z.infer<typeof profileFormSchema>;
