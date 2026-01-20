"use client";

import { Listing } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { formatAmount, isLessThan3Hours } from "@/app/utils/format";
import Button from "@/app/components/Button";
import useCountDown from "@/app/hooks/useCountDown";
import clsx from "clsx";
import { canEndAuction } from "@/app/utils/format";
import { useRouter } from "next/navigation";
import { pusherClient } from "@/app/libs/pusher";
import { User } from "next-auth";
import { Bid } from "@prisma/client";
import ProgressBar from "./ProgressBar";
import {
  FaHashtag,
  FaRegClock,
  FaCommentAlt,
  FaRegCommentAlt,
} from "react-icons/fa";
import Link from "next/link";
import { GoStar, GoStarFill } from "react-icons/go";
import { RiAuctionFill, RiAuctionLine } from "react-icons/ri";
import toast from "react-hot-toast";

interface AuctionStatusBarProps {
  listing: Listing;
  currentUser?: string | null;
  highestBidderName?: string | null;
  commentsCount?: number;
  bidsCount?: number;
}

const AuctionStatusBar: React.FC<AuctionStatusBarProps> = ({
  listing,
  currentUser,
  highestBidderName,
  commentsCount,
  bidsCount,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bid, setBid] = useState<number | null>(listing.currentBid);
  const [watching, setWatching] = useState<boolean>(
    listing.watchersIds.includes(currentUser as string),
  );
  const timeLeft = useCountDown(listing.auctionEndsAt as Date, listing.id);
  const router = useRouter();

  const endAuction = useCallback(() => {
    setIsLoading(true);
    axios
      .post("/api/auction-end", { listingId: listing.id })
      .then((res) => {
        console.log("Auction ended", res.data);
      })
      .catch((err) => {
        console.log("Error ending auction", err);
      })
      .finally(() => {
        setIsLoading(false);
        router.refresh();
      });
  }, [listing.id, router]);

  const toggleWatchList = () => {
    if (!currentUser) {
      toast.error("You need to be logged in!");
      return;
    }

    axios
      .post("/api/update-watchlist", { listingId: listing.id })
      .then((data) => {
        console.log("success ", data);
      })
      .catch((error) => {
        console.error("Error updating watchlist: ", error);
      });

    setWatching(!watching);
  };

  useEffect(() => {
    axios
      .post("/api/listing-view", { listingId: listing.id, userId: currentUser })
      .then((res) => {
        console.log("View recorded", res.data);
      })
      .catch((err) => {
        console.log("Error recording view", err);
      });
  }, [listing.id, currentUser]);

  useEffect(() => {
    const channelName = `listing-${listing.id}`;
    const channel = pusherClient.subscribe(channelName);

    const newBidHandler = (bid: Bid & { user: User }) => {
      console.log("New bid received via Pusher:", bid.amount);
      // Optionally, you can update local state or refetch data here
      setBid(bid.amount);
    };

    channel.bind("new-bid", newBidHandler);

    return () => {
      channel.unbind("new-bid", newBidHandler);
      pusherClient.unsubscribe(channelName);
    };
  }, [listing.id]);

  // useEffect(() => {
  //   axios
  //     .post("/api/seen-listing", { listingId: listing.id, userId: currentUser })
  //     .then((res) => {
  //       console.log("Seen listing recorded", res.data);
  //     })
  //     .catch((err) => {
  //       console.log("Error recording seen listing", err);
  //     });
  // }, [listing.id, currentUser]);

  // useEffect(() => {
  //   if (listing.auctionEndsAt) {
  //     const now = new Date();
  //     const distance = listing.auctionEndsAt.getTime() - now.getTime();

  //     if (listing.status === "ENDED") {
  //       console.log("Auction already ended");
  //       return;
  //     }

  //     if (distance <= 0) {
  //       endAuction();
  //       return;
  //     }
  //   }
  // }, [listing.auctionEndsAt, listing.status, endAuction]);

  return (
    <>
      {listing.status === "LIVE" ? (
        <div className="sticky top-11 z-[99] text-xs md:text-sm lg:text-base bg-gray-900 text-white rounded-md shadow-md shadow-gray-400">
          <ProgressBar endTime={listing.auctionEndsAt} listingId={listing.id} />
          <div className="flex flex-row flex-wrap gap-2 justify-between items-center p-2 lg:p-4">
            {/* <span className="inline-block px-4 py-2  font-semibold text-white bg-red-600 rounded-md">
              LIVE
            </span> */}

            <span
              className={clsx(
                `flex items-center gap-1`,
                isLessThan3Hours(timeLeft) && "text-red-600",
              )}
            >
              <b>
                <FaRegClock />
              </b>{" "}
              {timeLeft}
            </span>
            {bid ? (
              <>
                <span className="flex items-center gap-1">
                  Bid: <b>${formatAmount(bid)}</b>
                </span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1">
                  Starting At: ${formatAmount(listing.startingBid as number)}
                </span>
              </>
            )}
            <div
              className={clsx(
                "flex flex-row justify-end items-center font-light",
                currentUser === listing.userId ? "gap-0" : "gap-4",
              )}
            >
              {/*user can end the auction if they are the owner*/}
              {currentUser !== listing.userId && (
                <>
                  <Link href="#bids" className="group flex items-center gap-1">
                    <span className="hidden md:inline">Bid</span>
                    <RiAuctionLine className="text-base lg:text-lg text-lime-500 group-hover:text-lime-600" />
                  </Link>
                </>
              )}
              <Link href="#comments" className="group flex items-center gap-1">
                <span className="hidden md:inline">Comment</span>
                <FaRegCommentAlt className="text-base lg:text-lg text-blue-500 group-hover:text-blue-600" />
              </Link>
              <div
                className="cursor-pointer group flex items-center gap-1"
                onClick={toggleWatchList}
              >
                {currentUser !== listing.userId &&
                  (watching ? (
                    <>
                      <span className="hidden md:inline">Unwatch</span>
                      <GoStarFill className="text-lg lg:text-xl text-yellow-500 group-hover:text-yellow-600" />
                    </>
                  ) : (
                    <>
                      <span className="hidden md:inline">Watch</span>
                      <GoStar className="text-lg lg:text-xl text-yellow-500 group-hover:text-yellow-600" />
                    </>
                  ))}
              </div>
            </div>
            {canEndAuction(timeLeft) && currentUser === listing.userId && (
              <Button disabled={isLoading} onClick={endAuction} fullWidth>
                {isLoading ? "Ending..." : "End Auction Now"}
              </Button>
            )}
          </div>
        </div>
      ) : listing.status === "ENDED" ? (
        <div className="sticky top-11 z-[99] text-xs md:text-sm lg:text-base bg-gray-900 text-white p-2 lg:p-4 rounded-md shadow-md shadow-gray-400 ">
          <div className="flex flex-row flex-wrap gap-2 justify-between items-center">
            {/* <span className="inline-block px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded-md">
              ENDED
            </span> */}
            <div>
              {listing.currentBid &&
              listing.currentBid < (listing.reservePrice || 0) ? (
                <>
                  Reserve not met, bid to{" "}
                  <span>
                    <b>${formatAmount(listing.currentBid)}</b>
                  </span>{" "}
                </>
              ) : listing.currentBid ? (
                <>
                  Sold for{" "}
                  <span>
                    <b>${formatAmount(listing.currentBid)}</b>
                  </span>
                </>
              ) : (
                <>
                  <b>No bids were placed.</b>
                </>
              )}
            </div>
            <div className="flex flex-row gap-4">
              <Link href="#bids" className="flex items-center gap-1">
                <FaHashtag />
                Bids {bidsCount}
              </Link>
              <Link href="#comments" className="flex items-center gap-1">
                <FaRegCommentAlt />
                Comments {commentsCount}
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="sticky top-11 z-[99] text-xs md:text-sm lg:text-base bg-gray-900 p-2 lg:p-4 rounded-md shadow-md shadow-gray-400 text-center">
          <span className="text-sm font-semibold text-white ">Upcoming</span>
        </div>
      )}
    </>
  );
};

export default AuctionStatusBar;
