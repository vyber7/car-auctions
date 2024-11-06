import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
//import { prisma } from "";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const { comment } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    //const message = await prisma.comment.create({
  } catch (error: any) {
    console.error(error, "ERROR_MESSAGES");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
