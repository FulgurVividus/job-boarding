import UpdateCompanyVacancy from "@/app/_components/UpdateCompanyVacancy";
import { auth } from "@/app/_lib/auth";
import { getCompanySpecificVacancy } from "@/app/_lib/services";
import { redirect } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    vacancyId: string;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { vacancyId } = await params;
  const companyVacancy = await getCompanySpecificVacancy(+vacancyId);
  const {
    // id,
    // created_at,
    // company_id,
    title,
    vacancyLocation,
    experienceRequired,
    salary,
    emailContact,
  } = companyVacancy;

  const session = await auth();
  const role: string | undefined = session?.user?.role;

  if (!role) {
    redirect("/role");
  }

  if (role !== "company") {
    redirect("/no-access");
  }

  return (
    <main className="px-10 py-5 md:px-20 md:py-10 flex flex-col justify-between items-center max-h-full">
      <h1 className="text-center mb-10 text-4xl md:text-8xl font-extrabold">
        <span className="text-mainSalmon">{title}</span> Vacancy Page
      </h1>

      <UpdateCompanyVacancy
        title={title}
        vacancyLocation={vacancyLocation}
        experienceRequired={experienceRequired}
        salary={salary}
        emailContact={emailContact}
      />
    </main>
  );
};

export default Page;
