import prisma from "../../libs/prismadb";
import getCurrentUser from "../../../app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const body = await request.json();
    const { listingId } = body;
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        watchers: true,
      },
    });

    const addToWatchList = async () => {
      await prisma.user.update({
        where: {
          id: currentUser?.id,
        },
        data: {
          watchListIds: {
            push: listingId,
          },
        },
        include: {
          watchList: true,
        },
      });
      // await prisma.listing.update({
      //   where: {
      //     id: listingId,
      //   },
      //   data: {
      //     watchersIds: {
      //       push: currentUser?.id,
      //     },
      //   },
      // });

      console.log(`Added ${listingId} (${listing?.make}) to watchlist`);
    };

    const removeFromWatchList = async () => {
      await prisma.user.update({
        where: {
          id: currentUser?.id,
        },
        data: {
          watchListIds: {
            set: currentUser?.watchListIds.filter((id) => id !== listingId),
          },
        },
      });
      await prisma.listing.update({
        where: {
          id: listingId,
        },
        data: {
          watchersIds: {
            set: listing?.watchersIds.filter((id) => id !== currentUser?.id),
          },
        },
      });
      console.log(`Removed ${listingId} (${listing?.make}) from watchlist`);
    };

    if (currentUser?.watchListIds.includes(listingId)) {
      removeFromWatchList();
    } else {
      addToWatchList();
    }

    return NextResponse.json(currentUser, { status: 201 });
  } catch (error: any) {
    console.log(error, "WATCHLIST_ERROR");
    //console.error(error, "REGISTRATION_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
