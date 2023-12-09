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
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import Loader from "../ui/loader";

export default function SignInForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<TSignInForm>({
    resolver: zodResolver(signInFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: TSignInForm) => {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/dashboard",
      redirect: false,
    });

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Upsss... Coś poszło nie tak.",
        description: result.error,
      });
      return;
    }

    if (result?.ok && result.url) {
      toast({
        variant: "default",
        title: "",
        description: "Zalogowano prawidłowo.",
      });
      router.push(result.url);
    }
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
                  type="input"
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
                <Input type="password" placeholder="Wpisz hasło" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="transition-all duration-500 ease-out"
        >
          <Loader showLoader={form.formState.isSubmitting} />
          Zaloguj
        </Button>
      </form>
    </Form>
  );
}
