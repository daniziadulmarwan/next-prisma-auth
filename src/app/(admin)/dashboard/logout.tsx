"use client";
import { useSession, signOut } from "next-auth/react";

const LogoutButton = () => {
  const { data: session } = useSession();
  return (
    <button onClick={() => signOut()} type="button">
      {session?.user?.name}
    </button>
  );
};

export default LogoutButton;
