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
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
        />
      </div>
    </div>
  );
};

export default Avatar;
