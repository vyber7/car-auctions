import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { now } from "lodash";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email)
      return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { bidAmount, listingId } = body;

    if (!bidAmount || !listingId)
      return new NextResponse("Missing Information", { status: 400 });

    const newBid = await prisma.bid.create({
      data: {
        amount: parseInt(bidAmount),
        createdAt: new Date(now()),
        listing: {
          connect: {
            id: listingId,
          },
        },
        user: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        user: true,
      },
    });

    console.log("New Bid Created:", newBid);

    const updatedListing = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        currentBid: parseInt(bidAmount),
        highestBidder: {
          connect: {
            id: currentUser.id,
          },
        },
        bidders: {
          connect: {
            id: currentUser.id,
          },
        },
        bids: {
          connect: {
            id: newBid.id,
          },
        },
      },
    });

    // when new bid is added, check the end time of the listing, if it's less than 2 minutes from now, extend it by 2 minutes
    // const listing = await prisma.listing.findUnique({
    //   where: {
    //     id: listingId,
    //   },
    // });

    if (updatedListing) {
      const nowDate = new Date();
      const distance = updatedListing.auctionEndsAt
        ? updatedListing.auctionEndsAt.getTime() - nowDate.getTime()
        : NaN;

      if (distance <= 2 * 60 * 1000) {
        const newEndTime = new Date(nowDate.getTime() + 2 * 60 * 1000);
        await prisma.listing.update({
          where: {
            id: listingId,
          },
          data: {
            auctionEndsAt: newEndTime,
          },
        });

        // trigger pusher event to update end time in real time
        await pusherServer.trigger(`listing-${listingId}`, "new-end-time", {
          newEndTime,
        });
      }
    }

    // trigger pusher event to update bids in real time
    await pusherServer.trigger(`listing-${listingId}`, "new-bid", newBid);

    //console.log("Listing bids updated:", updatedListing);
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        bids: {
          connect: { id: newBid.id },
        },
        bidOnList: {
          connect: {
            id: listingId,
          },
        },
      },
    });

    return NextResponse.json({ newBid, updatedListing, updatedUser });
  } catch (error) {
    console.error("Error placing bid:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
