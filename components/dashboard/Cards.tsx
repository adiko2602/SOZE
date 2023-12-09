"use client";

import { useSession } from "next-auth/react";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

type TCard = {
  header: string;
  content: string;
  footer: string;
  url: string;
  urlLabel: string;
};

const USER: TCard[] = [
  {
    content:
      "Sprawdź i edytuj dane swojego profilu. Zmiana adresu zamieszkania, numeru telefonu.",
    header: "Profil",
    footer: "Przejdź do edycji.",
    url: "/profile/user/id",
    urlLabel: "Otwórz",
  },
  {
    content: "Sprawdź zgłoszenia i zalecenia dla Ciebie.",
    header: "Moje zgłoszenia",
    footer: "Przejdź do zgłoszeń.",
    url: "/report/user/id",
    urlLabel: "Otwórz",
  },
  {
    content: "Sprawdzić wywiady i ograniczenia dla Ciebie.",
    header: "Moje wywiady",
    footer: "Przejdź do wywiadów.",
    url: "/interview/user/id",
    urlLabel: "Otwórz",
  },
];

const MEDICAL_WORKER: TCard[] = [
  {
    content: "Przeglądaj zgłoszenia utworzone przez ten punkt medyczny.",
    header: "Zgłoszenia",
    footer: "Przejdź do zgłoszeń.",
    url: "/report",
    urlLabel: "Otwórz",
  },
  {
    content: "Utwórz nowe zgłoszenie dla chorego pacjetna.",
    header: "Nowe zgłoszenie",
    footer: "Przejdź do nowego zgłoszenia.",
    url: "/report/create",
    urlLabel: "Otwórz",
  },
  ...USER,
];

const SANITARY_WORKER: TCard[] = [
  {
    content: "Przeglądaj zgłoszenia utworzone przez punkty medyczne.",
    header: "Zgłoszenia",
    footer: "Przejdź do zgłoszeń.",
    url: "/report",
    urlLabel: "Otwórz",
  },
  {
    content: "Przeglądaj wywiady utworzone przez punkty sanitarne.",
    header: "Wywiady",
    footer: "Przejdź do wywiadów.",
    url: "/interview",
    urlLabel: "Otwórz",
  },
  {
    content: "Utówrz nowy wywiad.",
    header: "Nowy wywiad",
    footer: "Przejdź do nowego wywiadu.",
    url: "/interview/create",
    urlLabel: "Otwórz",
  },
  ...USER,
];

const MEDICAL_ADMIN: TCard[] = [
  {
    content:
      "Zarządzaj punktem jest miejscem do zmiany adresu, czy danych kontaktowych.",
    header: "Zarządzaj punktem",
    footer: "Przejdź do zarządzania.",
    url: "/medical-unit/id",
    urlLabel: "Otwórz",
  },
  {
    content:
      "Zarządzaj pracownikami jest miejscem do dodawania, usuwania, czy edytowania pracowników.",
    header: "Zarządzaj pracownikami",
    footer: "Przejdź do zarządzania.",
    url: "/medical-unit/id/worker",
    urlLabel: "Otwórz",
  },
  ...MEDICAL_WORKER,
];

const SANITARY_ADMIN: TCard[] = [
  {
    content:
      "Zarządzaj punktem jest miejscem do zmiany adresu, czy danych kontaktowych.",
    header: "Zarządzaj punktem",
    footer: "Przejdź do zarządzania.",
    url: "/sanitary-unit/id",
    urlLabel: "Otwórz",
  },
  {
    content:
      "Zarządzaj pracownikami jest miejscem do dodawania, usuwania, czy edytowania pracowników.",
    header: "Zarządzaj pracownikami",
    footer: "Przejdź do zarządzania.",
    url: "/sanitary-unit/id/worker",
    urlLabel: "Otwórz",
  },
  ...SANITARY_WORKER,
];

const cards: {
  USER: TCard[];
  MEDICAL_ADMIN: TCard[];
  SANITARY_ADMIN: TCard[];
  MEDICAL_WORKER: TCard[];
  SANITARY_WORKER: TCard[];
  SUPER_ADMIN: TCard[];
} = {
  USER: USER,
  MEDICAL_WORKER: MEDICAL_WORKER,
  SANITARY_WORKER: SANITARY_WORKER,
  MEDICAL_ADMIN: MEDICAL_ADMIN,
  SANITARY_ADMIN: SANITARY_ADMIN,
  SUPER_ADMIN: [],
};

function DashboardCards() {
  const { data: session } = useSession();

  return (
    <>
      {session?.user.role &&
        cards[session.user.role].map((card) => (
          <Card>
            <CardHeader>
              <CardTitle>{card.header}</CardTitle>
            </CardHeader>
            <CardContent>{card.content}</CardContent>
            <CardFooter>
              <div className="w-full">
                <div className="flex flex-col gap-2">
                  <div>{card.footer}</div>
                  <div>
                    <Link href={card.url}>
                      <Button variant="outline">{card.urlLabel}</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
    </>
  );
}

export default DashboardCards;
