import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    idToken: string;
    error?: string;
    user: DefaultSession["user"] & {
      id?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    idToken: string;
    error?: string;
    name?: string | null;
    email?: string | null;
    picture?: string | null;
    sub?: string;
  }
}
