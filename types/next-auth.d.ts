import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      userId: number | undefined;
      role: string | undefined;
    };
  }

  interface User {
    name: string;
    email: string;
    image: string;
    userId: number | undefined;
    role: string | undefined;
  }
}
