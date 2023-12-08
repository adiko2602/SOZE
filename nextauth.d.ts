import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { userDto } from "./lib/prisma/models/userDTO";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: number;
    email: string;
    role: Role;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: User;
  }
}
