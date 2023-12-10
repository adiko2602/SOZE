"use server";

import { Sex } from "@prisma/client";
import {
  ErrorServerFunctionResponse,
  SuccessServerFunctionResponse,
} from "../api/serverFunctionResponse";
import { comparePassword, hashPassword } from "../helpers/passwordHash";
import prisma from "../prisma/prisma";
import { TSignUpForm } from "../types";
import { signUpFormSchema } from "../zod/form/signUp.form.schema";

export async function signInWithCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        profileId: true,
      },
    });

    if (!user)
      return new ErrorServerFunctionResponse("Nieprawidłowy email lub hasło.");

    if (
      !(await comparePassword({
        password: password,
        hashedPassword: user.password,
      }))
    )
      return new ErrorServerFunctionResponse("Nieprawidłowy email lub hasło.");

    return new SuccessServerFunctionResponse("Zalogowano poprawnie.", user);
  } catch (err) {
    return new ErrorServerFunctionResponse("Nieznany błąd.");
  }
}

export async function signUpWithCreadentials(values: TSignUpForm) {
  try {
    const result = signUpFormSchema.safeParse(values);
    if (!result.success)
      return new ErrorServerFunctionResponse("Błąd danych wejściowych.");

    const userExist = await prisma.user.findFirst({
      where: {
        OR: [
          { email: values.email },
          { profile: { pesel: values.personal.pesel } },
        ],
      },
      include: {
        profile: true,
      },
    });

    if (userExist)
      return new ErrorServerFunctionResponse(
        "Użytkownik już istnieje, spróbuj się zalogować."
      );

    const hashedPassword = await hashPassword({
      password: values.passwords.password,
    });

    await prisma.user.create({
      data: {
        email: values.email,
        password: hashedPassword,
        profile: {
          create: {
            pesel: values.personal.pesel,
            personal: {
              create: {
                firstName: values.personal.firstName,
                secondName: values.personal.secondName ?? "",
                lastName: values.personal.lastName,
                pesel: values.personal.pesel,
                sex: values.personal.sex as Sex,
              },
            },
            contact: {
              create: {},
            },
            address: {
              create: {},
            },
          },
        },
      },
    });

    return new SuccessServerFunctionResponse(
      "Utworzono nowego użytkownika.",
      {}
    );
  } catch (err) {
    console.log(err);
    return new ErrorServerFunctionResponse("Nieznany błąd.");
  }
}
