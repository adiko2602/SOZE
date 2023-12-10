import { Get, Patch } from "@/lib/api/serverFunctionResponseToApiResponse";
import { NextRequest } from "next/server";
import {
  getProfileById,
  updateProfileById,
} from "@/lib/actions/profileActions";
import { TProfileForm } from "@/lib/types";

export async function GET(
  req: NextRequest,
  { params }: { params: { profileId: string } }
) {
  const { profileId } = params;
  return Get(await getProfileById({ profileId }));
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { profileId: string } }
) {
  const { profileId } = params;

  const data: TProfileForm = await req.json();
  return Patch(await updateProfileById({ profileId, values: data }));
}
