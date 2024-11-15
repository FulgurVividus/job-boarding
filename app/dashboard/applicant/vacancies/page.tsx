import SignOutButton from "@/app/_components/SignOutButton";
import VacanciesList from "@/app/_components/VacanciesList";
import React from "react";

const Page: React.FC = () => {
  return (
    <>
      <main className="px-20 py-10 max-w-full">
        <SignOutButton />
        <h1 className="mt-10">Applicant Vacancies Page</h1>

        <div className="mt-10 flex items-center">
          <VacanciesList />
        </div>
      </main>
    </>
  );
};

export default Page;
