"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AccountLinks = () => {
  const pathname = usePathname();
  const isActive = (path: string) =>
    pathname === path ? "font-bold bg-slate-200" : "";

  return (
    <ul className="bg-white rounded-md shadow-md shadow-gray-400 p-4 lg:col-span-1 col-span-4 flex lg:flex-col gap-2 h-fit justify-between flex-wrap">
      <li className={`p-2 border rounded-md ${isActive("/account/profile")}`}>
        <Link href="/account/profile">Profile</Link>
      </li>
      <li
        className={`p-2 border rounded-md ${isActive(
          "/account/notifications"
        )}`}
      >
        <Link href="/account/notifications">Notifications</Link>
      </li>
      <li className={`p-2 border rounded-md ${isActive("/account/listings")}`}>
        <Link href="/account/listings">My Listings</Link>
      </li>
      <li
        className={`p-2 border rounded-md ${isActive(
          "/account/bids-and-wins"
        )}`}
      >
        <Link href="/account/bids-and-wins">My Bids & Wins</Link>
      </li>
      <li className={`p-2 border rounded-md ${isActive("/account/shipments")}`}>
        <Link href="/account/shipments">My Shipments</Link>
      </li>{" "}
    </ul>
  );
};

export default AccountLinks;
