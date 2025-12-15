"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AccountLinks = () => {
  const pathname = usePathname();
  const isActive = (path: string) => (pathname === path ? "font-bold" : "");

  return (
    <ul className="bg-white rounded-md shadow-md shadow-gray-400 p-4 lg:col-span-1 col-span-4 flex flex-col gap-2 h-fit">
      <li className="py-2">
        <Link href="/account/profile" className={isActive("/account/profile")}>
          Profile
        </Link>
      </li>
      <li className="py-2">
        <Link
          href="/account/notifications"
          className={isActive("/account/notifications")}
        >
          Notifications
        </Link>
      </li>
      <li className="py-2">
        <Link
          href="/account/listings"
          className={isActive("/account/listings")}
        >
          My Listings
        </Link>
      </li>
      <li className="py-2">
        <Link
          href="/account/bids-and-wins"
          className={isActive("/account/bids-and-wins")}
        >
          My Bids & Wins
        </Link>
      </li>
      <li className="py-2">
        <Link
          href="/account/shipments"
          className={isActive("/account/shipments")}
        >
          My Shipments
        </Link>
      </li>{" "}
    </ul>
  );
};

export default AccountLinks;
