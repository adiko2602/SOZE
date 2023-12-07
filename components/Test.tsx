"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { requests } from "@/lib/api/apiRequest";
import { TTest } from "@/lib/server/test";

export default function Test() {
  const { data } = useQuery({
    queryKey: ["getTest"],
    queryFn: () => requests.get<TTest>("/api/test"),
  });

  return <div>{JSON.stringify(data?.data)}</div>;
}
