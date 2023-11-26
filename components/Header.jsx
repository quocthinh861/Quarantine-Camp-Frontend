import { signOut, useSession } from "next-auth/react";
import React from "react";

function Header() {
  const { data: session } = useSession();

  const handleSignOut = async (e) => {
    e.preventDefault();
    await signOut({ callbackUrl: "/auth/signin" });
  };

  return (
    <div className="flex justify-between px-4 p-4">
      <h1 className="fs-5">
        <b>Hospital Management System</b>
      </h1>
      <h2>
        <a href="/admin" className="mr-2">
          Manager
        </a>
        <a
          href="/auth/signout"
          className="mr-2 underline"
          onClick={handleSignOut}
          disabled={!session}
        >
          Sign Out
        </a>
      </h2>
    </div>
  );
}

export default Header;
