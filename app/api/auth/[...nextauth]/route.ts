import NextAuth from "next-auth";
import { authOptions } from "@/app/libs/auth-config";

export const { GET, POST } = NextAuth(authOptions);
