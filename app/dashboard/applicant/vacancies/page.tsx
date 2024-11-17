import SignOutButton from "@/app/_components/SignOutButton";
import ApplicantVacanciesList from "@/app/_components/ApplicantVacanciesList";
import React from "react";

const Page: React.FC = () => {
  return (
    <>
      <main className="px-20 py-10 max-w-full">
        <SignOutButton />
        <h1 className="mt-10">Applicant Vacancies Page</h1>

        <div className="mt-10 flex items-center">
          <ApplicantVacanciesList />
        </div>
      </main>
    </>
  );
};

export default Page;
