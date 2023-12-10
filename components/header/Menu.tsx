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
import useMenuLinks from "@/lib/hooks/useMenuLink";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const menuLinks = useMenuLinks();

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
        {menuLinks.map((menuLink) => {
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Menu;
