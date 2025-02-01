"use client";

import React from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
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
          type="button"
        >
          Try Again
        </button>
      </div>
    </main>
  );
};

export default Error;
