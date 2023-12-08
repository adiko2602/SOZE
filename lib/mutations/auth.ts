import { useMutation } from "@tanstack/react-query";
import { requests } from "../api/apiRequest";
import { TSignUpForm } from "../types";

export function signUpFormMutation() {
  return useMutation({
    mutationKey: ["signUpFormMutation"],
    mutationFn: (values: TSignUpForm) =>
      requests.post<unknown, TSignUpForm>("/api/auth/sign-up", values),
  });
}
