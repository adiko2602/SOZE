import * as bcrypt from "bcryptjs";

export async function comparePassword({
  password,
  hashedPassword,
}: {
  password: string;
  hashedPassword: string;
}) {
  return await bcrypt.compare(password, hashedPassword);
}

export async function hashPassword({ password }: { password: string }) {
  return await bcrypt.hash(password, 10);
}
