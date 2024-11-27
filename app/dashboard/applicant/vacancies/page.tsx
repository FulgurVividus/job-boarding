import SignOutButton from "@/app/_components/SignOutButton";
import ApplicantVacanciesList from "@/app/_components/ApplicantVacanciesList";
import React from "react";

const Page: React.FC = () => {
  return (
    <>
      <main className="px-10 py-5 md:px-20 md:py-10 max-w-full">
        <div className="flex items-center justify-between">
          <SignOutButton />

          {/* TODO: search bar */}

          {/* TODO: add filters */}
        </div>

        <h1 className="mt-5 md:mt-10 text-lg md:text-2xl font-bold">
          <span className="text-mainSalmon">Applicant&apos;s</span> Vacancies
          Page
        </h1>

        <div className="mt-10">
          <ApplicantVacanciesList />
        </div>
      </main>
    </>
  );
};

export default Page;
