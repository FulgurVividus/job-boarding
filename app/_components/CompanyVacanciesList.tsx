import dynamic from "next/dynamic";
import React from "react";
const CompanyVacancyItem = dynamic(() => import("./CompanyVacancyItem"));

interface CompanyVacanciesListProps {
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
  paginatedCompanyAllVacancies,
}) => {
  return (
    <section>
      <CompanyVacancyItem
        paginatedCompanyAllVacancies={paginatedCompanyAllVacancies || []}
      />
    </section>
  );
};

export default CompanyVacanciesList;
