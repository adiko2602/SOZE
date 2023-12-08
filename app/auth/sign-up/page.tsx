import SignUpForm from "@/components/auth/SignUpForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

function SignUp() {
  return (
    <div className="w-full flex justify-center flex-row p-2">
      <div className="max-w-lg w-full">
        <Card>
          <CardHeader>
            <CardTitle>Zarejestruj się</CardTitle>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
          <CardFooter>
            <div className="flex flex-col gap-2">
              <div>
                Masz już konto? Przejdź do{" "}
                <Link href="/auth/sign-in" className="underline">
                  logowania
                </Link>{" "}
                i zacznij korzystać z SOZE.
              </div>
              <div>
                Jesteś pracownikiem medycznym lub sanitarnym? Skontaktuj się z
                administratorem w Twojej firmie.
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default SignUp;
