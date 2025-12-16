import getCurrentUser from "@/app/actions/getCurrentUser";
import AccountHeader from "@/app/account/components/AccountHeader";
import AccountLinks from "@/app/account/components/AccountLinks";
import Empty from "@/app/components/Empty";

//export const dynamic = "force-dynamic";

const Notifications = async () => {
  const currentUser = await getCurrentUser();
  return (
    <>
      <div className="m-auto max-w-5xl grid grid-cols-4 gap-4 pb-4 px-2 lg:px-0">
        <AccountHeader userName={currentUser?.name?.split(" ")[0]} />
        <AccountLinks />
        <div className="lg:col-span-3 col-span-4">
          <Empty />
        </div>
      </div>
    </>
  );
};

export default Notifications;
