"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "../ui/button";

type TMenuLink = {
  label: string;
  url: string;
};

const menuLinks: {
  NOT_LOGIN: TMenuLink[];
  USER: TMenuLink[];
  MEDICAL_ADMIN: TMenuLink[];
  SANITARY_ADMIN: TMenuLink[];
  MEDICAL_WORKER: TMenuLink[];
  SANITARY_WORKER: TMenuLink[];
  SUPER_ADMIN: TMenuLink[];
} = {
  NOT_LOGIN: [
    {
      label: "Zaloguj",
      url: "/auth/sign-in",
    },
    {
      label: "Zarejestruj",
      url: "/auth/sign-up",
    },
  ],
  USER: [],
  MEDICAL_ADMIN: [
    {
      label: "Zarządzaj punktem",
      url: "/",
    },
  ],
  SANITARY_ADMIN: [
    {
      label: "Zarządzaj punktem",
      url: "/",
    },
  ],
  MEDICAL_WORKER: [
    {
      label: "Zgłoś",
      url: "/reports/create",
    },
    {
      label: "Przeglądaj zgłoszenia",
      url: "/reports",
    },
  ],
  SANITARY_WORKER: [
    {
      label: "Przeglądaj zgłoszenia",
      url: "/reports",
    },
    {
      label: "Przeprowadź wywiad",
      url: "/interviews/create",
    },
    {
      label: "Wywiady",
      url: "/interviews",
    },
  ],
  SUPER_ADMIN: [],
};

function Menu() {
  const role = "SANITARY_WORKER";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="div-btn div-btn-outline div-btn-size-icon">
          <HamburgerMenuIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuLinks[role].map((menuLink) => (
          <DropdownMenuItem className="p-0 m-0">
            <Link href={menuLink.url} className="w-full h-full p-2">
              {menuLink.label}
            </Link>
          </DropdownMenuItem>
        ))}
        {role && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0 m-0">
              <Link href="/profiles" className="w-full h-full p-2">
                Profil
              </Link>
            </DropdownMenuItem>
            <DropdownMenu>
              <div className="p-2">
                <Button className="w-full" size="sm">
                  <div className="text-sm">Wyloguj</div>
                </Button>
              </div>
            </DropdownMenu>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Menu;
