"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface GoBackProps {
  children: React.ReactNode;
  fallbackURL: string;
}

const GoBack: React.FC<GoBackProps> = ({ children, fallbackURL }) => {
  const router = useRouter();

  function handleGoBack() {
    router.push(fallbackURL);
  }

  return (
    <>
      <button
        type="button"
        title="Go back"
        onClick={handleGoBack}
        className="common-button"
      >
        {children}
      </button>
    </>
  );
};

export default GoBack;
