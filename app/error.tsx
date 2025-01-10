"use client";

// import { useRouter } from "next/navigation";
import React from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  //   const router = useRouter();

  return (
    <main className="flex justify-center items-center flex-col gap-6 h-screen px-4">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-red-600">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-700 mt-2 text-sm md:text-base">
          {error.message}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <button
          onClick={reset}
          className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors w-full sm:w-auto"
        >
          Try Again
        </button>
        {/* <span className="hidden sm:block text-gray-600">OR</span>
        <button
          onClick={() => router.back()}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md shadow-md hover:bg-gray-300 transition-colors w-full sm:w-auto"
        >
          Go Back
        </button> */}
      </div>
    </main>
  );
};

export default Error;
