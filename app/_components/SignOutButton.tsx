import React from "react";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "@/app/_lib/actions";

const SignOutButton: React.FC = () => {
  return (
    <button
      className="flex items-center justify-center"
      onClick={signOutAction}
    >
      <ArrowLeftStartOnRectangleIcon className="h-7 w-7" />
      <span className="font-semibold">Sign Out</span>
    </button>
  );
};

export default SignOutButton;
