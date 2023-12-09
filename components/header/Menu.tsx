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
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

type TMenuLink = {
  label: string;
  url: string;
};

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
    url: "/profile/user/id",
  },
  {
    label: "Moje zgłoszenia",
    url: "/report/user/id",
  },
  {
    label: "Moje wywiady",
    url: "/interview/user/id",
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

const menuLinks: {
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
        {session?.user.role &&
          menuLinks[session.user.role].map((menuLink) => {
            if (menuLink.label === "divider") return <DropdownMenuSeparator />;
            return (
              <DropdownMenuItem
                onClick={() => setIsOpen(false)}
                key={menuLink.label}
              >
                <Link href={menuLink.url} className="w-full h-full p-2">
                  {menuLink.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
        {session?.user.role && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <div className="w-full h-full p-2 hover:cursor-pointer">
                Wyloguj
              </div>
            </DropdownMenuItem>
          </>
        )}
        {!session &&
          menuLinks["NOT_LOGIN"].map((menuLink) => (
            <DropdownMenuItem
              onClick={() => setIsOpen(false)}
              key={menuLink.label}
            >
              <Link href={menuLink.url} className="w-full h-full p-2">
                {menuLink.label}
              </Link>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Menu;
