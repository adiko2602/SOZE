import Link from "next/link";

export default function Home() {
  return (
    <div className="text-xl">
      Witaj na stronie{" "}
      <strong>Systemu Obsługi Zagrożeń Epidemiologicznych</strong>. Aby móc w
      pełni wykorzystać potencjał systemu{" "}
      <Link href="/auth/sign-in" className="underline">
        zaloguj się
      </Link>{" "}
      lub{" "}
      <Link href="/auth/sign-up" className="underline">
        zarejestruj się
      </Link>
      .
    </div>
  );
}
