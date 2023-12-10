"use client";

import { TProfileForm } from "@/lib/types";
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

import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import Loader from "../ui/loader";
import { profileFormSchema } from "@/lib/zod/form/profile.form.schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Sex } from "@prisma/client";
import { useGetProfileByIdQuery } from "@/lib/hooks/queries/profileQueries";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useProfileFormMutation } from "@/lib/hooks/mutations/profileMutations";

export default function ProfileForm() {
  const { toast } = useToast();
  const { data: session } = useSession();

  const { data: getProfileByIdQuery } = useGetProfileByIdQuery({
    profileId: session?.user.profileId,
  });

  const { mutateAsync: profileFormMutation, isPending } =
    useProfileFormMutation();

  const form = useForm<TProfileForm>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    values: getProfileByIdQuery?.data,
  });

  const onSubmit = async (values: TProfileForm) => {
    const mutationResult = await profileFormMutation({
      profileId: session?.user.profileId,
      values,
    });

    if (!mutationResult.success) {
      toast({
        variant: "destructive",
        title: "Upsss... Coś poszło nie tak.",
        description: mutationResult.message,
      });
      return;
    }

    toast({
      variant: "default",
      title: "",
      description: mutationResult.message,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personalne</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <FormField
              control={form.control}
              name="personal.firstName"
              disabled
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
              disabled
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
              disabled
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwisko</FormLabel>
                  <FormControl>
                    <Input
                      type="input"
                      placeholder="Wpisz nazwisko"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="personal.pesel"
              disabled
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

            <FormField
              control={form.control}
              name="personal.sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Płeć</FormLabel>
                  <FormControl>
                    <Select
                      disabled
                      onValueChange={field.onChange}
                      value={field.value}
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Adres</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <FormField
              control={form.control}
              name="address.countryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Państwo</FormLabel>
                  <FormControl>
                    <Input
                      type="input"
                      placeholder="Wpisz państwo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Województwo</FormLabel>
                  <FormControl>
                    <Input
                      type="input"
                      placeholder="Wpisz województwo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kod pocztowy</FormLabel>
                  <FormControl>
                    <Input
                      type="input"
                      placeholder="Wpisz kod pocztowy"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Miasto</FormLabel>
                  <FormControl>
                    <Input type="input" placeholder="Wpisz miasto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wpisz ulice (jeśli występuje)</FormLabel>
                  <FormControl>
                    <Input type="input" placeholder="Wpisz ulicę" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="address.houseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numer domu</FormLabel>
                  <FormControl>
                    <Input
                      type="input"
                      placeholder="Wpisz numer domu"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="address.apartmentNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numer mieszkania (jeśli występuje)</FormLabel>
                  <FormControl>
                    <Input
                      type="input"
                      placeholder="Wpisz numer mieszkania"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Kontakt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <FormField
              control={form.control}
              name="contact.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email kontaktowy (jeśli występuje)</FormLabel>
                  <FormControl>
                    <Input type="input" placeholder="Wpisz email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact.phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numer telefonu kontaktowy</FormLabel>
                  <FormControl>
                    <Input
                      type="input"
                      placeholder="Wpisz numer telefonu"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" disabled={isPending}>
          <Loader showLoader={isPending} />
          Aktualizuj
        </Button>
      </form>
    </Form>
  );
}
