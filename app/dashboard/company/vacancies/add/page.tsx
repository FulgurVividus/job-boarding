import AddCompanyVacancy from "@/app/_components/AddCompanyVacancy";
import { auth } from "@/app/_lib/auth";
import { getCompanyUser, getUser } from "@/app/_lib/services";
import { redirect } from "next/navigation";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publish",
  description: "In this page, company user can publish a new vacancy",
};

const Page: React.FC = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await getUser(session?.user?.email || "");
  const role: string | undefined = user?.role;

  if (!role) {
    redirect("/role");
  }

  if (role !== "company") {
    redirect("/no-access");
  }

  const companyUser = await getCompanyUser(user?.email);

  if (!companyUser) {
    redirect("/create-form");
  }

  return (
    <main className="px-10 py-5 md:px-20 md:py-10 flex flex-col justify-between items-center max-h-full">
      <h1 className="text-center mb-10 text-3xl md:text-6xl font-extrabold tracking-tight">
        <span className="text-mainSalmon drop-shadow-lg">Publish</span>{" "}
        <span className="text-gray-800 dark:text-gray-200">Vacancy Page</span>
      </h1>

      <AddCompanyVacancy companyUser={companyUser} />
    </main>
  );
};

export default Page;
