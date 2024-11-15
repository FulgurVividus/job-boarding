import { getVacancy } from "@/app/_lib/services";
import Link from "next/link";
import React from "react";

const Page: React.FC = async ({ params }) => {
  const vacancy = await getVacancy(params.vacancyId);

  return (
    <main>
      <h1>Vacancy Page</h1>

      <h2>{vacancy.title}</h2>

      <Link href={`/dashboard/applicant/vacancies/${vacancy.id}/apply`}>
        Go for
      </Link>
    </main>
  );
};

export default Page;
