import AccountLinks from "@/app/components/AccountLinks";
import prisma from "../../libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Listing from "@/app/components/Listing";
import AccountHeader from "@/app/components/AccountHeader";
import AccountListing from "@/app/components/AccountListing";

const MyListings = async () => {
  const currentUser = await getCurrentUser();
  const uploaded = await prisma.listing.findMany({
    where: {
      userId: currentUser?.id,
    },
  });
  const watching = await prisma.listing.findMany({
    where: {
      watchersIds: {
        has: currentUser?.id,
      },
    },
  });

  return (
    <>
      <div className="m-auto max-w-5xl grid grid-cols-4 gap-4 pb-4">
        <AccountHeader userName={currentUser?.name?.split(" ")[0]} />
        <AccountLinks />
        <div className="col-span-3">
          <h2 className="text-xl font-bold bg-gray-100 p-2">Uploaded</h2>
          {uploaded ? (
            <ul className="flex flex-col gap-5 py-5">
              {uploaded.map((listing) => (
                <li
                  key={listing.id}
                  className="mb-1 border rounded-md shadow-md shadow-gray-400"
                >
                  <AccountListing
                    id={listing.id}
                    year={listing.year}
                    make={listing.make}
                    model={listing.model}
                    miles={listing.miles}
                    price={listing.price}
                    description={listing.description}
                    watchersIds={listing.watchersIds}
                    currentUser={currentUser?.id as string}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>No cars found.</p>
          )}
          <h2 className="text-xl font-bold bg-gray-100 p-2">Watching</h2>
          {watching ? (
            <ul className="flex flex-col gap-5 py-5">
              {watching.map((listing) => (
                <li
                  key={listing.id}
                  className="mb-1 border rounded-md shadow-md shadow-gray-400"
                >
                  <AccountListing
                    id={listing.id}
                    year={listing.year}
                    make={listing.make}
                    model={listing.model}
                    miles={listing.miles}
                    price={listing.price}
                    description={listing.description}
                    watchersIds={listing.watchersIds}
                    currentUser={currentUser?.id as string}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>No cars found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyListings;
