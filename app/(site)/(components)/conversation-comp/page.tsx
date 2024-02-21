"use client";

import clsx from "clsx";

import useConversation from "@/app/(hooks)/userConversation";

import EmptyState from "../EmptyState";

const Home = () => {
  const { isOpen } = useConversation();

  return (
    <div className={clsx("lg:pl-80 h-full", isOpen ? "block" : "hidden")}>
      <EmptyState />
    </div>
  );
};

export default Home;
