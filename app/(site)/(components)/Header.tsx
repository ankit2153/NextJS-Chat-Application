"use client";

import useOtherUser from "@/app/(hooks)/useOtherUser";
import { Conversation } from "@prisma/client";

import { User } from "@prisma/client";
import Link from "next/link";
import { useMemo } from "react";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import Avatar from "./Avatar";

import { ProfileDrawer } from "./ProfileDrawer";

import { useState } from "react";
import { AvatarGroup } from "./AvatarGroup";
import useActiveList from "@/app/(hooks)/useActiveList";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const { members } = useActiveList();

  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const [drawerOpen, setDrawerOpen] = useState(false);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return ` ${conversation.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="block  text-sky-500 hover:text-sky-600 transition cursor-pointer"
          ></Link>

          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}

          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
          </div>
          <div className="text-sm font-light text-neutral-500">
            {statusText}
          </div>
        </div>

        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="text-sky-500 hover:text-sky-600 transition cursor-pointer"
        />
      </div>
    </>
  );
};

export default Header;
