import React from "react";
import {
  getCompanyAllVacancies,
  getCompanyUser,
  getUser,
} from "@/app/_lib/services";
import CompanyVacancyItem from "./CompanyVacancyItem";
import { auth } from "@/app/_lib/auth";

const CompanyVacanciesList: React.FC = async () => {
  const session = await auth();

  const user = await getUser(session?.user?.email || "");
  const companyUser = await getCompanyUser(user?.email);

  const companyAllVacancies = await getCompanyAllVacancies(companyUser?.id);

  return (
    <section>
      <CompanyVacancyItem companyAllVacancies={companyAllVacancies || []} />
    </section>
  );
};

export default CompanyVacanciesList;
