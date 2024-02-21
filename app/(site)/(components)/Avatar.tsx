"use client";

import useActiveList from "@/app/(hooks)/useActiveList";
import { User } from "@prisma/client";

import Image from "next/image";

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList();

  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <Image
          alt="avatar"
          fill
          src={user?.image || "/images/placeholder.jpg"}
        />
      </div>
      {isActive && (
        <span className="absolute inline-flex items-center justify-center bg-green-500 rounded-full h-3 w-3 right-0 bottom-0 border-2 border-white" />
      )}
    </div>
  );
};

export default Avatar;
