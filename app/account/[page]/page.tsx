import getCurrentUser from "@/app/actions/getCurrentUser";
import Link from "next/link";
import Image from "next/image";
import Spacer from "@/app/components/Spacer";

//export const dynamic = "force-dynamic";

interface Params {
  params: Promise<{
    page: string;
  }>;
}
const currentUser = await getCurrentUser();

const Profile = async (props: Params) => {
  const { page } = await props.params;
  console.log("PAGE: ", page);

  return (
    <>
      <div className="m-auto max-w-5xl grid grid-cols-4 gap-4 pb-4">
        <div className="col-span-3 flex justify-around">
          <div className="relative">
            <h2 className="py-2">Name: {currentUser?.name}</h2>
            <h2 className="py-2">Email: {currentUser?.email}</h2>
            <h2 className="py-2">Password: ************</h2>
            <button className="absolute bottom-0 py-2">Edit Info</button>
          </div>
          <div>
            <Image
              src={
                currentUser?.image ??
                "/images/default-profile-picture-avatar-png-green.png"
              }
              alt="profile image"
              width={100}
              height={100}
            ></Image>
            <button className="text-center w-full">Edit Image</button>
          </div>
        </div>
      </div>
      <Spacer />
    </>
  );
};

export default Profile;
