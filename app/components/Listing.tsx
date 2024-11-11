"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoStar, GoStarFill } from "react-icons/go";
import axios from "axios";
import toast from "react-hot-toast";
import Title from "./Title";

interface ListingProps {
  id: string;
  year: number;
  make: string;
  model: string;
  miles: number;
  price: number;
  location: string;
  description: string;
  watchersIds: string[];
  currentUser: string | undefined;
}

const Listing: React.FC<ListingProps> = ({
  id,
  year,
  make,
  model,
  miles,
  price,
  location,
  description,
  watchersIds,
  currentUser,
}) => {
  const router = useRouter();

  const toggleWatchList = () => {
    axios
      .post("/api/update-watchlist", { listingId: id })
      .then((data) => {
        console.log("success ", data);
      })
      .catch(() => toast.error("You need to be logged in!"));
  };

  return (
    <div className="flex flex-wrap justify-between transition-all">
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

      <div className="flex flex-col">
        <Link className="w-full" href={`/listing/${id}`}>
          <Image
            src="/images/default-vehicle-image.png"
            alt="listing Image"
            width={400}
            height={300}
            className="w-full rounded-t object-cover lg:rounded-t-none lg:rounded-tl"
            priority={true}
          />
        </Link>
        <p className="flex justify-between p-2 bg-gray-200 text-sm">
          <span>~{miles} miles</span>
          <span>Time: 12:00:00</span>
          <span>Bid ${price}</span>
        </p>
      </div>
      <div className="text-sm p-2 pt-0">
        6-Speed Manual, V12 Power, California-Owned, Some Modifications
        <span className="block text-gray-500">{location}</span>
      </div>
      {/* <div className="relative px-3 pb-8 lg:w-1/2">
        <p className="relative h-48 overflow-hidden after:absolute after:bottom-0 after:left-0 after:h-20 after:w-full after:bg-gradient-to-t after:from-white ">
          {description}
        </p>
        <button
          onClick={() => router.push(`/listing/${id}`)}
          className="z-1 absolute bottom-2 p-2 right-1/2 translate-x-1/2 rounded text-sm font-bold transition hover:bg-gray-100"
        >
          Read more...
        </button>
      </div> */}
    </div>
  );
};

export default Listing;
