import { Get } from "@/lib/api/serverFunctionResponseToApiResponse";
import { TTest, getTest } from "@/lib/actions/test";

export async function GET() {
  return Get<TTest>(await getTest());
}
