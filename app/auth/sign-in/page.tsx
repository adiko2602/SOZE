import SignInForm from "@/components/auth/SignInForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

function SignIn() {
  return (
    <div className="w-full flex justify-center flex-row p-2">
      <div className="max-w-lg w-full">
        <Card>
          <CardHeader>
            <CardTitle>Zaloguj się</CardTitle>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
          <CardFooter>
            <div>
              Nie masz konta? Przejdź do{" "}
              <Link href="/auth/sign-up" className="underline">
                rejestracji
              </Link>{" "}
              i zacznij korzystać z SOZE już dziś.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default SignIn;
