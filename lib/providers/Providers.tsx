"use client";

import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import {
  getMessageOnError,
  getMessageOnSuccess,
} from "../helpers/queryResponseMessage";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (err) => {
        toast({
          title: "Upsss... Coś poszło nie tak.",
          description: getMessageOnError(err),
          variant: "destructive",
        });
      },
      onSuccess: (data) => {
        toast({
          title: "",
          description: getMessageOnSuccess(data),
          variant: "default",
        });
      },
    }),
    mutationCache: new MutationCache({
      onError: (err) => {
        toast({
          title: "Upsss... Coś poszło nie tak.",
          description: getMessageOnError(err),
          variant: "destructive",
        });
      },
      onSuccess: (data) => {
        toast({
          title: "",
          description: getMessageOnSuccess(data),
          variant: "default",
        });
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
}
