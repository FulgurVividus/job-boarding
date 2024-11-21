import { getAllVacancies } from "@/app/_lib/services";
import React from "react";
import ApplicantVacancyItem from "./ApplicantVacancyItem";

const ApplicantVacanciesList: React.FC = async () => {
  const allVacancies = await getAllVacancies();

  return (
    <>
      <section>
        <ApplicantVacancyItem allVacancies={allVacancies || []} />
      </section>
    </>
  );
};

export default ApplicantVacanciesList;
