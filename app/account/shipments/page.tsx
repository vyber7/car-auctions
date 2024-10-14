import getCurrentUser from "@/app/actions/getCurrentUser";
import AccountHeader from "@/app/components/AccountHeader";
import AccountLinks from "@/app/components/AccountLinks";
import Spacer from "@/app/components/Spacer";

const Shipments = async () => {
  const currentUser = await getCurrentUser();
  return (
    <>
      <div className="m-auto max-w-5xl grid grid-cols-4 gap-4 pb-4">
        <AccountHeader userName={currentUser?.name?.split(" ")[0]} />
        <AccountLinks />
        <div className="col-span-3 flex justify-around">
          You don&apos;t have any shipments scheduled
        </div>
      </div>
      <Spacer />
    </>
  );
};

export default Shipments;
