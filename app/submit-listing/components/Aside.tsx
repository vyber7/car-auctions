"use client";

import { Listing } from "@prisma/client";

import SideListingBox from "@/app/components/SideListingBox";

interface AsideProps {
  auctions: Listing[];
  variant?: "live" | "sold";
}

const Aside: React.FC<AsideProps> = ({ auctions, variant }) => {
  return (
    <aside className="pt-4 lg:p-0 h-fit">
      {variant === "sold" && <h2 className="pb-4 font-bold">Recently Sold</h2>}
      {variant === "live" && <h2 className="pb-4 font-bold">Live Auctions</h2>}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-1 gap-2 lg:gap-4">
        {auctions.map((auction) => (
          <SideListingBox
            key={auction.id}
            auction={auction}
            variant={variant}
          />
        ))}
      </div>
    </aside>
  );
};

export default Aside;
