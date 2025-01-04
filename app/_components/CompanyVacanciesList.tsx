import React from "react";
import {
  getCompanyAllVacancies,
  getCompanyUser,
  getUser,
} from "@/app/_lib/services";
import CompanyVacancyItem from "./CompanyVacancyItem";
import { auth } from "@/app/_lib/auth";

interface CompanyVacanciesListProps {
  query?: string;
}

const CompanyVacanciesList: React.FC<CompanyVacanciesListProps> = async ({
  query,
}) => {
  const session = await auth();

  const user = await getUser(session?.user?.email || "");
  const companyUser = await getCompanyUser(user?.email);

  const companyAllVacancies = await getCompanyAllVacancies(companyUser?.id);

  return (
    <section>
      <CompanyVacancyItem
        companyAllVacancies={companyAllVacancies || []}
        query={query}
      />
    </section>
  );
};

export default CompanyVacanciesList;
