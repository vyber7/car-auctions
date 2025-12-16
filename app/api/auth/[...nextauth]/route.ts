import NextAuth from "next-auth";
import { authOptions } from "@/app/libs/auth-config";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

//export const { GET, POST } = NextAuth(authOptions);
