import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { Role } from "@prisma/client";

interface CustomUser {
  id: number;
  email: string;
  role: Role;
  profileId: number;
}

declare module "next-auth" {
  interface User {
    id: number;
    email: string;
    role: Role;
    profileId: number;
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
