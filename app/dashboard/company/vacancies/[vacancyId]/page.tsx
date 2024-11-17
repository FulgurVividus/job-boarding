import { getCompanySpecificVacancy } from "@/app/_lib/services";
import React from "react";

interface PageProps {
  params: {
    vacancyId: string;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const companyVacancy = await getCompanySpecificVacancy(+params.vacancyId);

  return (
    <main>
      <h1>Vacancy Page</h1>

      <h2>{companyVacancy.title}</h2>

      <div className="flex items-center gap-5">
        <button>update</button>
        <button>delete</button>
      </div>
    </main>
  );
};

export default Page;
