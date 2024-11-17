import Link from "next/link";
import React from "react";

interface AllVacanciesProps {
  allVacancies: {
    id: number;
    created_at: string;
    title: string;
    vacancyLocation: string;
    experienceRequired: number;
    salary: string;
    emailContact: string;
  }[];
}

const ApplicantVacancyItem: React.FC<AllVacanciesProps> = ({
  allVacancies,
}) => {
  return (
    <>
      <div>
        {allVacancies.map((vacancy) => (
          <ul key={vacancy.id}>
            <Link href={`/dashboard/applicant/vacancies/${vacancy.id}`}>
              <li>{vacancy.title}</li>
            </Link>
          </ul>
        ))}
      </div>
    </>
  );
};

export default ApplicantVacancyItem;
