import Spinner from "@/app/_components/Spinner";
import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4 text-center">
      <Spinner />
      <p className="text-lg md:text-xl font-medium text-gray-600">
        Loading vacancies for you...
      </p>
    </div>
  );
};

export default Loading;
