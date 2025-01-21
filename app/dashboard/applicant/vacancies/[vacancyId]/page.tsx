import {
  getAllVacancies,
  getApplicantUser,
  getUser,
  getVacancy,
  getVacancyStatus,
} from "@/app/_lib/services";
import React from "react";
import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";
import ApplyForVacancy from "@/app/_components/ApplyForVacancy";

export async function generateMetadata({
  params,
}: {
  params: { vacancyId: string };
}) {
  const { vacancyId } = params;
  const { title } = await getVacancy(+vacancyId);

  return {
    title: `${title}`,
  };
}

export const revalidate = 1;
export const dynamicParams = true;

export async function generateStaticParams() {
  const allVacancies = await getAllVacancies();

  const allVacanciesId =
    allVacancies?.map((vacancy) => ({
      vacancyId: String(vacancy.id),
    })) || [];

  return allVacanciesId;
}

const Page = async ({ params }: { params: { vacancyId: string } }) => {
  const { vacancyId } = params;
  const vacancy = await getVacancy(+vacancyId);

  const session = await auth();

  const user = await getUser(session?.user?.email || "");
  const role: string | undefined = user?.role;

  const applicantUser = await getApplicantUser(user?.email);
  const { id: applicantId } = applicantUser;

  const data = await getVacancyStatus(vacancy.id, applicantId);
  const status: string = data?.status ?? null;

  if (!role) {
    redirect("/role");
  }

  if (role !== "applicant") {
    redirect("/no-access");
  }

  if (!applicantUser) {
    redirect("/create-form");
  }

  return (
    <>
      <main className="px-10 py-5 md:px-20 md:py-10 flex flex-col justify-between items-center max-h-full">
        <h1 className="text-center mb-10 text-3xl md:text-6xl font-extrabold tracking-tight">
          <span className="text-mainSalmon drop-shadow-lg">
            {vacancy.title}
          </span>{" "}
          <span className="text-gray-800 dark:text-gray-200">Vacancy Page</span>
        </h1>

        <ApplyForVacancy
          vacancy={vacancy}
          applicantId={applicantId}
          status={status}
        />
      </main>
    </>
  );
};

export default Page;
