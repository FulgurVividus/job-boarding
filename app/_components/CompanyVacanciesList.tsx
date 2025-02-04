import dynamic from "next/dynamic";
import React from "react";
const CompanyVacancyItem = dynamic(() => import("./CompanyVacancyItem"));

interface CompanyVacanciesListProps {
  query?: string;
  paginatedCompanyAllVacancies: {
    id: number;
    created_at: string;
    company_id: number;
    title: string;
    vacancyLocation: string;
    experienceRequired: number;
    salary: string;
    emailContact: string;
  }[];
}

const CompanyVacanciesList: React.FC<CompanyVacanciesListProps> = async ({
  query,
  paginatedCompanyAllVacancies,
}) => {
  return (
    <section>
      <CompanyVacancyItem
        paginatedCompanyAllVacancies={paginatedCompanyAllVacancies || []}
        query={query}
      />
    </section>
  );
};

export default CompanyVacanciesList;
