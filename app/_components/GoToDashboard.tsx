"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface GoToDashboardProps {
  userRole: string | undefined;
}

const GoToDashboard: React.FC<GoToDashboardProps> = ({ userRole }) => {
  const router = useRouter();

  return (
    <>
      {userRole === "company" ? (
        <button
          type="button"
          title="Go to dashboard"
          className="common-button"
          onClick={() => router.push("/dashboard/company/vacancies")}
        >
          Go to dashboard
        </button>
      ) : (
        <button
          type="button"
          title="Go to dashboard"
          className="common-button"
          onClick={() => router.push("/dashboard/applicant/vacancies")}
        >
          Go to dashboard
        </button>
      )}
    </>
  );
};

export default GoToDashboard;
