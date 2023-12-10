"use server";

import { getServerSession } from "next-auth";
import {
  ErrorServerFunctionResponse,
  SuccessServerFunctionResponse,
} from "../api/serverFunctionResponse";
import prisma from "../prisma/prisma";
import { TProfileForm } from "../types";
import { profileFormSchema } from "../zod/form/profile.form.schema";
import { authOptions } from "../nextauth/authOptions";

export async function getProfileById({ profileId }: { profileId: string }) {
  try {
    const profile = await prisma.profile.findFirst({
      where: {
        id: parseInt(profileId),
      },
      include: {
        address: true,
        contact: true,
        personal: true,
      },
    });

    if (!profile)
      return new ErrorServerFunctionResponse("Nie znaleziono profilu.");

    return new SuccessServerFunctionResponse("Znaleziono profil.", profile);
  } catch (err) {
    console.log(err);
    return new ErrorServerFunctionResponse("Nieznany błąd.");
  }
}

export async function updateProfileById({
  profileId,
  values,
}: {
  profileId: string;
  values: TProfileForm;
}) {
  const result = profileFormSchema.safeParse(values);
  if (!result.success) return new ErrorServerFunctionResponse("Bład danych.");

  const session = await getServerSession(authOptions);
  if (session?.user.profileId.toString() !== profileId)
    return new ErrorServerFunctionResponse("Błąd autoryzacji.");

  try {
    const updatedProfile = await prisma.profile.update({
      where: {
        id: parseInt(profileId),
      },
      data: {
        contact: {
          update: {
            data: {
              ...values.contact,
            },
          },
        },
        address: {
          update: {
            data: {
              ...values.address,
            },
          },
        },
      },
      include: {
        address: true,
        contact: true,
        personal: true,
      },
    });

    if (!updatedProfile)
      return new ErrorServerFunctionResponse("Błąd aktualizacji profilu.");

    return new SuccessServerFunctionResponse(
      "Profil zaktualizowany prawidłowo.",
      updatedProfile
    );
  } catch (err) {
    return new ErrorServerFunctionResponse("Nieznany błąd.");
  }
}
