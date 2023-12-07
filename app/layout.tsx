import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/lib/providers/Providers";

const lato = Lato({
  subsets: ["latin-ext"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "System Obsługi Zagrożeń Epidemiologicznych",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="pl-PL">
        <body className={`${lato.variable} font-lato`}>
          <main className="flex min-h-screen flex-col">
            <Header />
            {children}
          </main>
          <Toaster />
        </body>
      </html>
    </Providers>
  );
}
