import { getAllVacancies } from "@/app/_lib/services";
import React from "react";
import ApplicantVacancyItem from "./ApplicantVacancyItem";

const ApplicantVacanciesList: React.FC = async () => {
  const allVacancies = await getAllVacancies();

  return (
    <>
      <section>
        <h1>Applicant Vacancies List</h1>

        <ApplicantVacancyItem allVacancies={allVacancies || []} />
      </section>
    </>
  );
};

export default ApplicantVacanciesList;
