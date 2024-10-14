import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  user: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const userImg =
    user?.image ?? "/images/default-profile-picture-avatar-png-green.png";
  return (
    <Image
      className="profile-image rounded-md object-cover"
      src={userImg}
      width={28}
      height={28}
      alt="profile image"
    />
  );
};

export default Avatar;
