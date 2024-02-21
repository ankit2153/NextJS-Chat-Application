"use client";
import React from "react";

import { signOut } from "next-auth/react";
import EmptyState from "../(site)/(components)/EmptyState";

function Users() {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState />
    </div>
  );
}

export default Users;
