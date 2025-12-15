import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  try {
    const { listingId } = await req.json();

    const updatedListing = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        auctionEndsAt: new Date(),
        status: "ENDED",
      },
    });

    if (
      updatedListing.reservePrice &&
      updatedListing.reservePrice >= (updatedListing.currentBid || 0)
    ) {
      await prisma.listing.update({
        where: {
          id: listingId,
        },
        data: {
          result: "RESERVE_NOT_MET",
        },
      });
    } else {
      await prisma.listing.update({
        where: {
          id: listingId,
        },
        data: {
          result: "SOLD",
        },
      });
    }

    return new NextResponse(
      JSON.stringify({ message: "Auction ended successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error ending auction:", error);
    return new NextResponse(JSON.stringify({ error: "Error ending auction" }), {
      status: 500,
    });
  }
}
