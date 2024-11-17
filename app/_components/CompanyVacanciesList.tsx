import React from "react";
import { getCompanyAllVacancies } from "@/app/_lib/services";
import CompanyVacancyItem from "./CompanyVacancyItem";

const CompanyVacanciesList: React.FC = async () => {
  // TODO: get company id dynamically
  const companyAllVacancies = await getCompanyAllVacancies(1);

  return (
    <section>
      <h1>Company Vacancies List</h1>

      <CompanyVacancyItem companyAllVacancies={companyAllVacancies || []} />
    </section>
  );
};

export default CompanyVacanciesList;
