import dynamic from "next/dynamic";
import React from "react";
const ApplicantVacancyItem = dynamic(() => import("./ApplicantVacancyItem"));

interface ApplicantVacanciesListProps {
  query?: string;
  paginatedAllVacancies: {
    id: number;
    created_at: string;
    title: string;
    vacancyLocation: string;
    experienceRequired: number;
    salary: string;
    emailContact: string;
  }[];
}

const ApplicantVacanciesList: React.FC<ApplicantVacanciesListProps> = async ({
  query,
  paginatedAllVacancies,
}) => {
  return (
    <>
      <section>
        <ApplicantVacancyItem
          paginatedAllVacancies={paginatedAllVacancies || []}
          query={query}
        />
      </section>
    </>
  );
};

export default ApplicantVacanciesList;
