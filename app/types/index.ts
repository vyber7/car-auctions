import { User } from "@prisma/client";

export type FullUserType =
  | User
  | {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
