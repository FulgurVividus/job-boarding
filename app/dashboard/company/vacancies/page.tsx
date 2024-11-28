import CompanyVacanciesList from "@/app/_components/CompanyVacanciesList";
import LinkButton from "@/app/_components/LinkButton";
import SignOutButton from "@/app/_components/SignOutButton";
import { getCompanyInfo } from "@/app/_lib/services";
import React from "react";

const Page: React.FC = async () => {
  // TODO: get company id dynamically
  const companyInfo = await getCompanyInfo(1);
  const { companyName } = await companyInfo;

  return (
    <>
      <main className="px-10 py-5 md:px-20 md:py-10 max-w-full">
        <div className="flex items-center justify-between">
          <SignOutButton />

          {/* TODO: search bar */}

          <LinkButton
            href={`/dashboard/company/vacancies/add`}
            title="Add a vacancy"
            className="uppercase font-semibold py-2 px-5"
          >
            add
          </LinkButton>
        </div>

        <h1 className="mt-5 md:mt-10 text-lg md:text-2xl font-bold">
          <span className="text-mainSalmon">{companyName}&apos;s</span>{" "}
          Vacancies Page
        </h1>

        <div className="mt-10">
          <CompanyVacanciesList />
        </div>
      </main>
    </>
  );
};

export default Page;
