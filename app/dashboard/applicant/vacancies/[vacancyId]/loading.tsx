import dynamic from "next/dynamic";
import React from "react";
const Spinner = dynamic(() => import("@/app/_components/Spinner"));

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4 text-center">
      <Spinner />
      <p className="text-lg md:text-xl font-medium text-gray-600">
        Loading vacancy for you...
      </p>
    </div>
  );
};

export default Loading;
