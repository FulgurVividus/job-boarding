import dynamic from "next/dynamic";
import React from "react";
const Spinner = dynamic(() => import("./_components/Spinner"));

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner />
    </div>
  );
};

export default Loading;
