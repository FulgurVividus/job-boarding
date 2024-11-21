import React from "react";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";

const SignOutButton: React.FC = () => {
  return (
    <form action="">
      <button className="flex items-center justify-center">
        <ArrowLeftStartOnRectangleIcon className="h-7 w-7" />
        <span className="font-semibold">Sign Out</span>
      </button>
    </form>
  );
};

export default SignOutButton;
