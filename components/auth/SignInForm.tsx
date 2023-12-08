"use client";

import { TSignInForm } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInFormSchema } from "@/lib/zod/form/signIn.form.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useToast } from "../ui/use-toast";

export default function SignInForm() {
  const { toast } = useToast();
  const toaster = useToast();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (
    error &&
    toaster.toasts.filter((a) => a.itemID === "error").length === 0
  ) {
    toast({
      itemID: "error",
      variant: "destructive",
      title: "Upsss... Coś poszło nie tak.",
      description: error,
    });
  }

  const form = useForm<TSignInForm>({
    resolver: zodResolver(signInFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: TSignInForm) => {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Wpisz adres email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hasło</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Wpisz adres hasło"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Zaloguj
        </Button>
      </form>
    </Form>
  );
}
