import CompanyVacanciesList from "@/app/_components/CompanyVacanciesList";
import SignOutButton from "@/app/_components/SignOutButton";
import Link from "next/link";
import React from "react";

const Page: React.FC = () => {
  return (
    <>
      <main className="px-20 py-10 max-w-full">
        <div className="flex items-center gap-10">
          <SignOutButton />

          <Link href={`/dashboard/company/vacancies/add`}>add</Link>
        </div>
        <h1 className="mt-10">Company Vacancies Page</h1>

        <div className="mt-10 flex items-center">
          <CompanyVacanciesList />
        </div>
      </main>
    </>
  );
};

export default Page;
