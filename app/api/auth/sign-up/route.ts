import { Post } from "@/lib/api/serverFunctionResponseToApiResponse";
import { signUpWithCreadentials } from "@/lib/actions/auth";
import { TSignUpForm } from "@/lib/types";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data: TSignUpForm = await req.json();
  return Post(await signUpWithCreadentials(data));
}
