import Link from "next/link";
import React from "react";

interface CompanyAllVacanciesProps {
  companyAllVacancies: {
    id: number;
    created_at: string;
    company_id: number;
    title: string;
    vacancyLocation: string;
    experienceRequired: number;
    salary: string;
    emailContact: string;
  }[];
}

const CompanyVacancyItem: React.FC<CompanyAllVacanciesProps> = ({
  companyAllVacancies = [],
}) => {
  console.log(companyAllVacancies);

  return (
    <>
      <div>
        {companyAllVacancies.map((vacancy) => (
          <ul key={vacancy.id}>
            <Link href={`/dashboard/company/vacancies/${vacancy.id}`}>
              {vacancy.title}
            </Link>
          </ul>
        ))}
      </div>
    </>
  );
};

export default CompanyVacancyItem;
