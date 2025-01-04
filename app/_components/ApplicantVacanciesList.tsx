import { getAllVacancies } from "@/app/_lib/services";
import React from "react";
import ApplicantVacancyItem from "./ApplicantVacancyItem";

interface ApplicantVacanciesListProps {
  query?: string;
}

const ApplicantVacanciesList: React.FC<ApplicantVacanciesListProps> = async ({
  query,
}) => {
  const allVacancies = await getAllVacancies();

  return (
    <>
      <section>
        <ApplicantVacancyItem allVacancies={allVacancies || []} query={query} />
      </section>
    </>
  );
};

export default ApplicantVacanciesList;
