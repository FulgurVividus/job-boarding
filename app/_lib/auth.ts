/* eslint-disable @typescript-eslint/no-explicit-any */

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUser } from "./services";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    authorized({ auth }: { auth: any }) {
      return !!auth?.user;
    },
    async signIn({ user }: { user: any }) {
      try {
        const existingUser = await getUser(user.email);

        if (!existingUser) {
          await createUser({ fullName: user.name, email: user.email });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session }: { session: any }) {
      const userUser = await getUser(session.user.email);
      session.user.userId = userUser.id; // saving the id in the session
      session.user.role = userUser.role; // saving the role in the session

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
