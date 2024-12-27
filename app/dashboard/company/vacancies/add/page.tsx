import AddCompanyVacancy from "@/app/_components/AddCompanyVacancy";
import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const Page: React.FC = async () => {
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
        <span className="text-mainSalmon">Add</span> Vacancy Page
      </h1>

      <AddCompanyVacancy />
    </main>
  );
};

export default Page;
