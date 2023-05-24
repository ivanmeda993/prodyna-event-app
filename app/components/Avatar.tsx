"use client";

import { User } from ".prisma/client";
import Image from "next/image";

interface AvatarProps {
  user?: User;
}
const Avatar = ({ user }: AvatarProps) => {
  return (
    <div className="relative flex justify-center">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 ">
        <Image
          src={user?.image || "/images/placeholder.jpg"}
          alt="Avatar"
          fill
        />
      </div>
    </div>
  );
};

export default Avatar;
