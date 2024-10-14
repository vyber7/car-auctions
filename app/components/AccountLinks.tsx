import Link from "next/link";

const AccountLinks = () => {
  return (
    <ul className="border-r">
      <li className="py-2">
        <Link href="/account/profile">Profile</Link>
      </li>
      <li className="py-2">
        <Link href="/account/notifications">Notifications</Link>
      </li>
      <li className="py-2">
        <Link href="/account/listings">My Listings</Link>
      </li>
      <li className="py-2">
        <Link href="/account/bids-and-wins">My Bids & Wins</Link>
      </li>
      <li className="py-2">
        <Link href="/account/shipments">My Shipments</Link>
      </li>{" "}
    </ul>
  );
};

export default AccountLinks;
