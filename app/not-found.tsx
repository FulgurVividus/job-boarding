import React from "react";
import { auth } from "./_lib/auth";
import LinkButton from "./_components/LinkButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  description: "Page is not found",
};

const NotFound: React.FC = async () => {
  const session = await auth();
  const role: string | undefined = session?.user?.role;

  let fallbackURL: string;

  if (role === "company") {
    fallbackURL = "/dashboard/company/vacancies";
  } else {
    fallbackURL = "/dashboard/applicant/vacancies";
  }

  return (
    <main className="flex flex-col justify-center items-center h-screen space-y-4">
      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-center">
        Oops! The page you&apos;re looking for{" "}
        <span className="text-mainSalmon">is not found</span> 😔
      </h1>

      {/* Description */}
      <p className="text-sm md:text-base text-center text-gray-600 dark:text-gray-300 max-w-md">
        It seems you’ve hit a dead end. Don’t worry, you can go back home and
        explore from there.
      </p>

      <LinkButton href={fallbackURL} title="Go back home">
        Go back home
      </LinkButton>
    </main>
  );
};

export default NotFound;
