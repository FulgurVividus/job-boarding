import React from "react";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "@/app/_lib/actions";

const SignOutButton: React.FC = () => {
  return (
    <div className="group">
      <button
        className="flex items-center justify-center group-hover:bg-gray-400 group-hover:rounded-md group-hover:text-white group-transition-all duration-200 py-1 px-2"
        onClick={signOutAction}
        title="Sign out"
      >
        <ArrowLeftStartOnRectangleIcon className="h-7 w-7" />
        <span
          className="font-semibold text-lg md:text-xl text-gray-800 dark:text-gray-100 tracking-tight bg-clip-tex group-hover:text-white duration-200"
          style={{
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "0.02em",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          Sign Out
        </span>
      </button>
    </div>
  );
};

export default SignOutButton;
