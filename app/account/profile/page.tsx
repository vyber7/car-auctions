import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "../../libs/prismadb";
import Image from "next/image";
import Spacer from "@/app/components/Spacer";
import AccountLinks from "@/app/components/AccountLinks";
import AccountHeader from "@/app/components/AccountHeader";
import Avatar from "@/app/components/Avatar";

const Profile = async () => {
  const currentUser = await getCurrentUser();

  return (
    <>
      <div className="m-auto max-w-5xl grid grid-cols-4 gap-4 pb-4">
        <AccountHeader userName={currentUser?.name?.split(" ")[0]} />
        <AccountLinks />
        <div className="col-span-3 flex justify-around">
          <div className="relative">
            <h2 className="py-2">Name: {currentUser?.name}</h2>
            <h2 className="py-2">Email: {currentUser?.email}</h2>
            <h2 className="py-2">Password: ************</h2>
            <button className="absolute bottom-0 py-2">Edit Info</button>
          </div>
          <div>
            <Avatar user={currentUser!} />
            <button className="text-center w-full">Edit Image</button>
          </div>
        </div>
      </div>
      <Spacer />
    </>
  );
};

export default Profile;
