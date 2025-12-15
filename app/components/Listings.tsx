"use client";
import { Listing, User } from "@prisma/client";
import ListingBox from "./ListingBox";

interface ListingsProps {
  listings: Listing[];
  currentUser: User | null;
}

const Listings: React.FC<ListingsProps> = ({ listings, currentUser }) => {
  return (
    <ul className="grid justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-2  lg:gap-4 pt-4">
      {listings.map((listing) => (
        <li
          key={listing.id}
          className="bg-white rounded-md shadow-md shadow-gray-600  hover:ring hover:ring-gray-900"
        >
          <ListingBox listing={listing} currentUser={currentUser} />
        </li>
      ))}
    </ul>
  );
};

export default Listings;
