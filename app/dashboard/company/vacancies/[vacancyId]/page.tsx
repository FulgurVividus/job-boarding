import UpdateCompanyVacancy from "@/app/_components/UpdateCompanyVacancy";
import { auth } from "@/app/_lib/auth";
import {
  getCompanySpecificVacancy,
  getCompanyUser,
  getUser,
} from "@/app/_lib/services";
import { redirect } from "next/navigation";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { vacancyId: string };
}) {
  const { vacancyId } = await params;
  const { title } = await getCompanySpecificVacancy(+vacancyId);

  return {
    title: `${title}`,
  };
}

interface PageProps {
  params: {
    vacancyId: string;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { vacancyId } = await params;
  const companyVacancy = await getCompanySpecificVacancy(+vacancyId);
  const {
    // created_at,
    // company_id,
    id,
    title,
    vacancyLocation,
    experienceRequired,
    salary,
    emailContact,
  } = companyVacancy;

  const session = await auth();

  const user = await getUser(session?.user?.email || "");
  const role: string | undefined = user?.role;

  const companyUser = await getCompanyUser(user?.email);

  if (!role) {
    redirect("/role");
  }

  if (role !== "company") {
    redirect("/no-access");
  }

  if (!companyUser) {
    redirect("/create-form");
  }

  return (
    <main className="px-10 py-5 md:px-20 md:py-10 flex flex-col justify-between items-center max-h-full">
      <h1 className="text-center mb-10 text-3xl md:text-6xl font-extrabold tracking-tight">
        <span className="text-mainSalmon drop-shadow-lg">{title}</span>{" "}
        <span className="text-gray-800 dark:text-gray-200">Vacancy Page</span>
      </h1>

      <UpdateCompanyVacancy
        id={id}
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
