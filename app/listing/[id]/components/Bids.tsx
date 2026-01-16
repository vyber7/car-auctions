"use client";
import Button from "@/app/components/Button";
import Title from "@/app/components/Title";
import { Bid, Listing, User } from "@prisma/client";
import axios from "axios";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { formatAmount, capitalize } from "@/app/utils/format";
import { pusherClient } from "@/app/libs/pusher";
import { RiAuctionFill } from "react-icons/ri";

interface BidsProps {
  listing: Listing;
  bids: (Bid & { user: { name: string | null } })[];
  sellerName?: string | null;
  sellerEmail?: string | null;
}

const Bids: React.FC<BidsProps> = ({
  listing,
  bids,
  sellerName,
  sellerEmail,
}) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [bid, setBid] = useState<number | null>(listing.currentBid);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  useEffect(() => {
    const channelName = `listing-${listing.id}`;
    const channel = pusherClient.subscribe(channelName);
    const newBidHandler = (bid: Bid & { user: User }) => {
      setBid(bid.amount);
    };
    channel.bind("new-bid", newBidHandler);

    return () => {
      pusherClient.unsubscribe(channelName);
      channel.unbind("new-bid", newBidHandler);
    };
  }, [listing.id]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setIsLoading(true);
    if (
      data.bidAmount <=
      ((listing.currentBid as number) || (listing.startingBid as number))
    ) {
      toast.error(
        `Your bid must be higher than the current bid of $${
          listing.currentBid || listing.startingBid
        }`
      );
      setIsLoading(false);
      return;
    }

    axios
      .post(`/api/place-bid`, { ...data, listingId: listing.id })
      .then((res) => {
        toast.success("Bid placed successfully!");
      })
      .catch(() => {
        toast.error("Error placing bid");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      id="bids"
      className="p-2 md:p-4 border shadow-md rounded-md text-sm md:text-base shadow-gray-400 bg-white"
    >
      <h2 className="pb-2 md:pb-4 text-lg font-bold">
        {listing.year} {capitalize(listing.make)} {capitalize(listing.model)}
      </h2>
      <div className="flex flex-col md:flex-row gap-2 md:justify-between pb-2 md:pb-4">
        <div className="md:w-1/2 w-full flex flex-col justify-between bg-slate-200 rounded-md p-2 md:p-4 gap-2 text-sm md:text-base">
          {listing.status === "ENDED" && listing.result === "SOLD" ? (
            <p className="text-green-600 font-bold">
              {listing.currentBid
                ? `Sold to ${
                    listing.highestBidderId
                      ? capitalize(
                          bids.find(
                            (bid) => bid.userId === listing.highestBidderId
                          )?.user.name as string
                        )
                      : ""
                  }, congratulations!`
                : "No bids were placed."}
            </p>
          ) : listing.status === "ENDED" && listing.currentBid === null ? (
            <p>No bids were placed</p>
          ) : listing.status === "ENDED" &&
            listing.result === "RESERVE_NOT_MET" ? (
            <p>Reserve not met, bid to</p>
          ) : (
            <p>
              {listing.currentBid ? (
                <span>Current Bid</span>
              ) : (
                <span>Starting at</span>
              )}{" "}
              <span className="font-semibold">
                {listing.highestBidderId
                  ? capitalize(
                      bids.find((bid) => bid.userId === listing.highestBidderId)
                        ?.user.name as string
                    )
                  : ""}
              </span>
            </p>
          )}
          <div className="font-semibold text-6xl">
            {bid ? (
              <span>${formatAmount(bid as number)}</span>
            ) : (
              <span>${formatAmount(listing.startingBid as number)}</span>
            )}
          </div>
        </div>

        <div className="md:w-1/2 w-full flex flex-col gap-2 text-sm">
          <p className="flex justify-start">
            <span className="w-1/4">Seller</span>
            <span className="font-semibold">
              {" "}
              {capitalize(sellerName as string)}
            </span>
          </p>
          <p className="flex justify-start">
            <span className="w-1/4">Ending</span>
            <span className="font-semibold">
              {" "}
              {new Date(listing.auctionEndsAt!).toLocaleString()}
            </span>
          </p>
          <p className="flex justify-start">
            <span className="w-1/4">Views</span>
            <span className="font-semibold"> {listing.views}</span>
          </p>
          <p className="flex justify-start">
            <span className="w-1/4">Watching</span>
            <span className="font-semibold"> {listing.watchersIds.length}</span>
          </p>
          <p className="flex justify-start">
            <span className="w-1/4">Bids</span>
            <span className="font-semibold"> {bids.length}</span>
          </p>
        </div>
      </div>
      {listing.status === "ENDED" ? null : session &&
        sellerEmail !== session?.user?.email ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative border flex border-gray-300 rounded-md has-[:focus]:ring has-[:focus]:ring-lime-500 hover:ring hover:ring-lime-500"
        >
          <input
            id="bidAmount"
            type="number"
            placeholder="Place a Bid"
            {...register("bidAmount", { required: true })}
            className={clsx(
              `w-full form-input
              block rounded-l-md
              
              text-gray-900
              font-semibold
              shadow-sm                  
              focus:border-transparent
              border-none
              focus:ring-transparent
               text-right        
              placeholder:text-gray-400 
              placeholder:font-normal
              placeholder:text-left
              `,
              errors.bidAmount && "border-rose-500 focus:ring-rose-500",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
            disabled={isLoading}
          />
          <button
            disabled={isLoading}
            type="submit"
            className="flex
        justify-center
        items-center
        px-2
        border-none
        text-sm
        font-semibold
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
        text-lime-500 hover:text-lime-600 focus-visible:outline-lime-600
        "
          >
            <RiAuctionFill className="text-2xl" />
          </button>
          <div className="absolute -top-7 md:-top-10 right-0 text-rose-500">
            {errors.bidAmount && <span>This field is required</span>}
          </div>
        </form>
      ) : !session ? (
        <>
          <hr />
          <div className="text-rose-500 mt-2 md:mt-4 text-center">
            Please log in to place a bid.
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Bids;
