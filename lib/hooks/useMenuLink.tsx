"use client";

import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type TMenuLink = {
  label: string;
  url: string;
};

export default function useMenuLinks() {
  const { data: session } = useSession();

  const NOT_LOGIN: TMenuLink[] = [
    {
      label: "Zaloguj",
      url: "/auth/sign-in",
    },
    {
      label: "Zarejestruj",
      url: "/auth/sign-up",
    },
  ];

  const USER: TMenuLink[] = [
    {
      label: "Profil",
      url: `/profile`,
    },
    {
      label: "Moje zgłoszenia",
      url: `/report/user/${session?.user.id}`,
    },
    {
      label: "Moje wywiady",
      url: `/interview/user/${session?.user.id}`,
    },
  ];

  const MEDICAL_WORKER: TMenuLink[] = [
    {
      label: "Zgłoszenia",
      url: "/report",
    },
    {
      label: "Nowe zgłoszenie",
      url: "/report/create",
    },
    {
      label: "divider",
      url: "divider",
    },
    ...USER,
  ];

  const MEDICAL_ADMIN: TMenuLink[] = [
    {
      label: "Zarządaj punktem",
      url: "/medical-unit/id",
    },
    {
      label: "Zarządzaj pracownikami",
      url: "/medical-unit/id/worker",
    },
    {
      label: "divider",
      url: "divider",
    },
    ...MEDICAL_WORKER,
  ];

  const SANITARY_WORKER: TMenuLink[] = [
    {
      label: "Zgłoszenia",
      url: "/report",
    },
    {
      label: "Wywiady",
      url: "/interview",
    },
    {
      label: "Nowy wywiad",
      url: "/interview/create",
    },
    {
      label: "divider",
      url: "divider",
    },
    ...USER,
  ];

  const SANITARY_ADMIN: TMenuLink[] = [
    {
      label: "Zarządaj punktem",
      url: "/sanitary-unit/id",
    },
    {
      label: "Zarządzaj pracownikami",
      url: "/medical-unit/id/worker",
    },
    {
      label: "divider",
      url: "divider",
    },
    ...SANITARY_WORKER,
  ];

  const links: {
    NOT_LOGIN: TMenuLink[];
    USER: TMenuLink[];
    MEDICAL_ADMIN: TMenuLink[];
    SANITARY_ADMIN: TMenuLink[];
    MEDICAL_WORKER: TMenuLink[];
    SANITARY_WORKER: TMenuLink[];
    SUPER_ADMIN: TMenuLink[];
  } = {
    NOT_LOGIN: NOT_LOGIN,
    USER: USER,
    MEDICAL_ADMIN: MEDICAL_ADMIN,
    SANITARY_ADMIN: SANITARY_ADMIN,
    MEDICAL_WORKER: MEDICAL_WORKER,
    SANITARY_WORKER: SANITARY_WORKER,
    SUPER_ADMIN: [],
  };

  const [menuLinks, setMenuLinks] = useState<TMenuLink[]>(links.NOT_LOGIN);

  useEffect(() => {
    if (!session) {
      setMenuLinks(links.NOT_LOGIN);
      return;
    }
    setMenuLinks(links[session.user.role]);
  }, [session]);

  return menuLinks;
}
