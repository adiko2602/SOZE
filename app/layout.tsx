import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin-ext"],
  weight: ["100", "300", "400", "700", "900"],
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
      <body className={lato.className}>
        <main className="flex min-h-screen">{children}</main>
      </body>
    </html>
  );
}
