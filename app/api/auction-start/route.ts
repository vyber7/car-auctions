import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { now } from "lodash";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email)
      return new NextResponse("Unauthorized", { status: 401 });

    // if (!currentUser.isAdmin)
    //   return new NextResponse("Forbidden", { status: 403 });
    const body = await req.json();
    console.log("Received auction data:", body);

    // if (
    //   !body.startTime ||
    //   !body.endTime ||
    //   !body.startingBid ||
    //   !body.bidIncrement
    // ) {
    //   return new NextResponse("Missing required fields", { status: 400 });
    // }
    const { endTime, startingBid, bidIncrement, listingId } = body;

    const updatedListing = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        auctionStartsAt: new Date(now()),
        auctionEndsAt: new Date(endTime),
        startingBid: parseFloat(startingBid),
        bidIncrement: parseFloat(bidIncrement),
        status: "LIVE",
      },
    });

    console.log("Listing updated with auction details:", updatedListing);

    return new NextResponse("Auction created", { status: 201 });
  } catch (error) {
    console.error("Error creating auction:", error);
    return new NextResponse("Failed to create auction", { status: 500 });
  }
}
