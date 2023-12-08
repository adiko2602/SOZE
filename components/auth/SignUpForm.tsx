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

import { signUpFormMutation } from "@/lib/mutations/auth";
import { signUpFormSchema } from "@/lib/zod/form/signUp.form.schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Sex } from "@prisma/client";

export default function SignUpForm() {
  const { mutate, isPending } = signUpFormMutation();

  const form = useForm<TSignUpForm>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: TSignUpForm) => {
    console.log("XD");
    mutate(values);
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
          Zarejestruj
        </Button>
      </form>
    </Form>
  );
}
