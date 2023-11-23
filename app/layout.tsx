import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

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
    <html lang="pl-PL">
      <body className={`${lato.variable} font-lato`}>
        <main className="flex min-h-screen flex-col">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
