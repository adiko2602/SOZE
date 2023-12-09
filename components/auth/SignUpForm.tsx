"use client";

import { TSignUpForm } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

import { signUpFormSchema } from "@/lib/zod/form/signUp.form.schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Sex } from "@prisma/client";
import { useSignUpFormMutation } from "@/lib/hooks/mutations/auth";
import { signIn } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Loader from "../ui/loader";

export default function SignUpForm() {
  const { toast } = useToast();
  const router = useRouter();

  const { mutateAsync: signUpFormMutation, isPending } =
    useSignUpFormMutation();

  const form = useForm<TSignUpForm>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: TSignUpForm) => {
    const mutationResult = await signUpFormMutation(values);
    if (!mutationResult.success) return;

    const result = await signIn("credentials", {
      email: values.email,
      password: values.passwords.password,
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
          name="passwords.password"
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

        <FormField
          control={form.control}
          name="passwords.confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Powtórz hasło</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Wpisz ponownie hasło"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personal.firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imię</FormLabel>
              <FormControl>
                <Input type="input" placeholder="Wpisz imię" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personal.secondName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Drugie imię (jeśli występuje)</FormLabel>
              <FormControl>
                <Input
                  type="input"
                  placeholder="Wpisz drugie imię"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personal.lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwisko</FormLabel>
              <FormControl>
                <Input type="input" placeholder="Wpisz nazwisko" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personal.sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Płeć</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Wybierz płeć" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={Sex.FEMALE}>Kobieta</SelectItem>
                      <SelectItem value={Sex.MALE}>Mężczyzna</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personal.pesel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PESEL</FormLabel>
              <FormControl>
                <Input type="input" placeholder="Wpisz PESEL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          <Loader showLoader={isPending} />
          Zarejestruj
        </Button>
      </form>
    </Form>
  );
}
