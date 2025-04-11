import dynamic from "next/dynamic";
import React from "react";
const ApplicantVacancyItem = dynamic(() => import("./ApplicantVacancyItem"));

interface ApplicantVacanciesListProps {
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
  paginatedAllVacancies,
}) => {
  return (
    <>
      <section>
        <ApplicantVacancyItem
          paginatedAllVacancies={paginatedAllVacancies || []}
        />
      </section>
    </>
  );
};

export default ApplicantVacanciesList;
