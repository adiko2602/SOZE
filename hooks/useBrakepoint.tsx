"use client";

import { useState, useEffect } from "react";

type TBrakepoint = "base" | "sm" | "md" | "lg" | "xl";

export function useBrakepoint() {
  const [brakepoint, setBrakepoint] = useState<TBrakepoint>("base");

  const handleBrakepoint = () => {
    const viewportWidth = window.innerWidth;
    if (viewportWidth < 640) {
      setBrakepoint("base");
    } else if (viewportWidth >= 640 && viewportWidth < 768) {
      setBrakepoint("sm");
    } else if (viewportWidth >= 768 && viewportWidth < 1024) {
      setBrakepoint("md");
    } else if (viewportWidth >= 1024 && viewportWidth < 1280) {
      setBrakepoint("lg");
    } else if (viewportWidth >= 1280) {
      setBrakepoint("xl");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleBrakepoint);
    return () => {
      window.removeEventListener("resize", handleBrakepoint);
    };
  }, []);

  return { brakepoint };
}
