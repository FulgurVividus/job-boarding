import { getAllVacancies } from "@/app/_lib/services";
import React from "react";
import VacancyItem from "./VacancyItem";

const VacanciesList: React.FC = async () => {
  const allVacancies = await getAllVacancies();

  return (
    <>
      <section>
        <h1>VacanciesList</h1>

        <VacancyItem allVacancies={allVacancies || []} />
      </section>
    </>
  );
};

export default VacanciesList;
