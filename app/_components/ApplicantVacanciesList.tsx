import React from "react";
import ApplicantVacancyItem from "./ApplicantVacancyItem";

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
  // const allVacancies = await getAllVacancies();

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
