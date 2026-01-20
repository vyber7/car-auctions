"use client";
import { Listing, User } from "@prisma/client";
import { useEffect, useState } from "react";
import AccountListingBox from "./AccountListingBox";
import { pusherClient } from "../../libs/pusher";
import { find } from "lodash";

interface WatchingListingsProps {
  initialListings: Listing[];
  currentUser: User | null;
}

const WatchingListings: React.FC<WatchingListingsProps> = ({
  initialListings,
  currentUser,
}) => {
  const [watchingListings, setWatchingListings] =
    useState<Listing[]>(initialListings);
  useEffect(() => {
    pusherClient.subscribe(`user-${currentUser?.id}-watching`);

    const watchingUpdateHandler = (data: Listing) => {
      setWatchingListings((current) => {
        // remove listing if already in the list
        return current.filter((listing) => listing.id !== data.id);
      });
    };

    pusherClient.bind("watching-update", watchingUpdateHandler);

    return () => {
      pusherClient.unsubscribe(`user-${currentUser?.id}-watching`);
      pusherClient.unbind("watching-update", watchingUpdateHandler);
    };
  }, [currentUser?.id]);
  return (
    <>
      <h2 className="text-xl font-bold bg-slate-800 rounded-t-md text-white p-2">
        Watching
      </h2>
      <ul className="flex flex-wrap pt-2 lg:pt-4 gap-2 lg:gap-0 justify-between">
        {watchingListings.map((listing) => (
          <li
            key={listing.id}
            className="w-full md:w-[49.5%] lg:w-[48.5%] rounded-md shadow-md shadow-gray-400"
          >
            <AccountListingBox
              listing={listing}
              currentUser={currentUser}
              watching={
                listing.watchersIds.includes(currentUser?.id as string)
                  ? true
                  : false
              }
              uploaded={listing.userId === currentUser?.id}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default WatchingListings;
