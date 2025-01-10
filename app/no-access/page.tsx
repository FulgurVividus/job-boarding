import React from "react";
import { auth } from "@/app/_lib/auth";
import GoBack from "@/app/_components/GoBack";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "No-access",
  description: "User cannot go to opposite role's dashboard",
};

const Page: React.FC = async () => {
  const session = await auth();
  const role: string | undefined = session?.user?.role;

  let fallbackURL: string;

  if (role === "company") {
    fallbackURL = "/dashboard/company/vacancies";
  } else {
    fallbackURL = "/dashboard/applicant/vacancies";
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen px-4">
      <h1 className="font-sans text-lg md:text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
        No Access{" "}
        <span className="text-red-600 font-extrabold text-xl md:text-3xl">
          !
        </span>
      </h1>

      <h1 className="font-sans text-base md:text-xl mt-4 text-center text-gray-700 dark:text-gray-300">
        You cannot access because your role is{" "}
        <span className="text-mainSalmon font-extrabold capitalize">
          {session?.user?.role || "undefined"}
        </span>
      </h1>

      <div className="mt-6">
        <GoBack fallbackURL={fallbackURL}>
          <span className="px-6 py-3">Go Back</span>
        </GoBack>
      </div>
    </div>
  );
};

export default Page;
