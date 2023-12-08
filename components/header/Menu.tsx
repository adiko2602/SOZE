"use client";

import React, { useState } from "react";
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
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

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
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const result = await signOut({
      callbackUrl: "/auth/sign-in",
      redirect: false,
    });

    if (result.url) {
      toast({
        variant: "default",
        title: "",
        description: "Wylogowano prawidłowo.",
      });
      router.push(result.url);
    }
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger>
        <div className="div-btn div-btn-outline div-btn-size-icon">
          <HamburgerMenuIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {session?.user.role && (
          <>
            {menuLinks[session.user.role].map((menuLink) => (
              <DropdownMenuItem
                onClick={() => setIsOpen(false)}
                key={menuLink.label}
              >
                <Link href={menuLink.url} className="w-full h-full p-2">
                  {menuLink.label}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/profiles" className="w-full h-full p-2">
                Profil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <div className="w-full h-full p-2 hover:cursor-pointer">
                Wyloguj
              </div>
            </DropdownMenuItem>
          </>
        )}
        {!session && (
          <>
            {menuLinks["NOT_LOGIN"].map((menuLink) => (
              <DropdownMenuItem
                onClick={() => setIsOpen(false)}
                key={menuLink.label}
              >
                <Link href={menuLink.url} className="w-full h-full p-2">
                  {menuLink.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Menu;
