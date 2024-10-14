"use client";

import Link from "next/link";
import { GoStar, GoStarFill } from "react-icons/go";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import Title from "./Title";

interface AccountListingProps {
  id: string;
  year: number;
  make: string;
  model: string;
  miles: number;
  price: number;
  description: string;
  watchersIds: string[];
  currentUser: string | undefined;
}

const AccountListing: React.FC<AccountListingProps> = ({
  id,
  year,
  make,
  model,
  miles,
  price,
  description,
  watchersIds,
  currentUser,
}) => {
  const toggleWatchList = () => {
    axios
      .post("/api/update-watchlist", { listingId: id })
      .then((data) => {
        console.log("success ", data);
      })
      .catch(() => toast.error("You need to be logged in!"));
  };

  return (
    <div className="flex flex-wrap justify-start transition-all">
      <div className="flex flex-col w-1/4">
        <Link className="w-full" href={`/listing/${id}`}>
          <Image
            src="/images/default-vehicle-image.png"
            alt="listing Image"
            width={200}
            height={200}
            className="w-full object-cover rounded-tl-md"
            priority={true}
          />
        </Link>

        <p className="flex justify-between p-2 bg-gray-200 text-sm rounded-bl-md">
          {/* <span>~{miles} miles</span> */}
          <span>Time: 12:00:00</span>
          <span>Bid ${price}</span>
        </p>
      </div>
      <div className="flex flex-col w-3/4">
        <div className="flex justify-between">
          <Link className="" href={`/listing/${id}`}>
            <Title year={year} make={make} model={model} />
          </Link>
          <button
            className="flex items-center text-xl px-2"
            onClick={() => toggleWatchList()}
          >
            {watchersIds.includes(currentUser as string) ? (
              <GoStarFill className="text-yellow-500" />
            ) : (
              <GoStar className="text-yellow-500" />
            )}
          </button>
        </div>
        <div className="text-sm p-2 pt-0">
          6-Speed Manual, V12 Power, California-Owned, Some Modifications
          <span className="block text-gray-500">Santa Cruz, CA 95060</span>
        </div>
      </div>
    </div>
  );
};

export default AccountListing;
