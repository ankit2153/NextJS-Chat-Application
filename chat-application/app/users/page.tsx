"use client";
import React from "react";

import { signOut } from "next-auth/react";

function Users() {
  return (
    <div>
      <button className="bg-red-500 rounded border-2 border-red-500 p-2 " onClick={() => signOut()}>Logout</button>
    </div>
  );
}

export default Users;
