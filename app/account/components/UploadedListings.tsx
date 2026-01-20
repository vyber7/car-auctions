"use client";

import { Listing, User } from "@prisma/client";
import React from "react";
import AccountListingBox from "./AccountListingBox";

interface UploadedListingsProps {
  listings: Listing[];
  currentUser: User | null;
}

const UploadedListings: React.FC<UploadedListingsProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <>
      <h2 className="text-xl font-bold bg-slate-800 text-white p-2 rounded-t-md">
        Uploaded
      </h2>
      <ul className="flex flex-wrap py-2 lg:py-4 gap-2 lg:gap-0 justify-between">
        {listings?.map((listing) => (
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

export default UploadedListings;
