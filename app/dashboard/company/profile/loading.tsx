import dynamic from "next/dynamic";
import React from "react";
const Spinner = dynamic(() => import("@/app/_components/Spinner"));

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4 text-center">
      <Spinner />
      <p className="text-lg md:text-xl font-medium text-gray-950">
        Loading your profile cabinet...
      </p>
    </div>
  );
};

export default Loading;
