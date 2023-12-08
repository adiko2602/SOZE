export function getErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  } else if (typeof err === "string") {
    return err;
  }
  return "";
}
