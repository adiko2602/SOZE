import { Loader2 } from "lucide-react";

export default function Loader({ showLoader }: { showLoader?: boolean }) {
  if (showLoader) return <Loader2 className="mr-2 h-4 w-4 animate-spin" />;
  return <></>;
}
