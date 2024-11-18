import { getVacancy } from "@/app/_lib/services";
import Link from "next/link";
import React from "react";

interface PageProps {
  params: {
    vacancyId: string;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { vacancyId } = await params;
  const vacancy = await getVacancy(+vacancyId);

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
