import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithCredentials } from "../server/auth";
import { getErrorMessage } from "../helpers/getErrorMessage";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { type: "email", label: "email" },
        password: { type: "password", label: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password)
            throw new Error("Nieprawidłowy email lub hasło.");

          const user = await signInWithCredentials({
            email: credentials.email,
            password: credentials.password,
          });

          if (!user.success) throw new Error(user.message);
          if (!user.data) throw new Error(user.message);

          return {
            id: user.data.id,
            email: user.data.email,
            role: user.data.role,
          };
        } catch (err: unknown) {
          throw new Error(encodeURI(getErrorMessage(err)));
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/sign-in",
  },

  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.user = { ...user };
        return token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = { ...token.user };
      }
      return session;
    },
  },
};
