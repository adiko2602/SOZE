"use client";
import { useBrakepoint } from "@/hooks/useBrakepoint";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as sozeLogo from "@/public/sozeLogo.svg";

function Logo() {
  const { brakepoint } = useBrakepoint();
  return (
    <div className="flex flex-row items-center gap-2">
      <Link href="/">
        <div className="w-[75px] h-[64px] relative">
          <Image alt="SOZE Logo" src={sozeLogo} priority={true} />
        </div>
      </Link>
      <div className="font-semibold uppercase">
        {brakepoint === "base" || brakepoint === "sm" ? (
          <>SOZE</>
        ) : (
          <>System Obsługi Zagrożeń Epidemiologicznych</>
        )}
      </div>
    </div>
  );
}

export default Logo;
