import { auth } from "@/app/_lib/auth";
import {
  getAllAppliedApplicants,
  getAllVacancies,
  getCompanySpecificVacancy,
  getCompanyUser,
  getUser,
} from "@/app/_lib/services";
import dynamic from "next/dynamic";
import { notFound, redirect } from "next/navigation";
const ApplicantsTable = dynamic(
  () => import("@/app/_components/ApplicantsTable")
);
const UpdateCompanyVacancy = dynamic(
  () => import("@/app/_components/UpdateCompanyVacancy")
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ vacancyId: string }>;
}) {
  const { vacancyId } = await params;
  const { title } = await getCompanySpecificVacancy(+vacancyId);

  return {
    title: `${title}`,
  };
}

export async function generateStaticParams() {
  const allVacancies = await getAllVacancies();

  const allVacanciesIds =
    allVacancies?.map((vacancy) => ({
      vacancyId: String(vacancy.id),
    })) || [];

  return allVacanciesIds;
}

const Page = async ({ params }: { params: Promise<{ vacancyId: string }> }) => {
  const { vacancyId } = await params;

  const [companyVacancy, session] = await Promise.all([
    getCompanySpecificVacancy(+vacancyId),
    auth(),
  ]);

  if (!session?.user?.email) {
    redirect("/login");
  }

  if (!companyVacancy) return notFound();

  const {
    id,
    title,
    vacancyLocation,
    experienceRequired,
    salary,
    emailContact,
  } = companyVacancy;

  const user = await getUser(session?.user?.email || "");
  const role: string | undefined = user?.role;

  if (!role) {
    redirect("/role");
  }

  if (role !== "company") {
    redirect("/no-access");
  }

  const [companyUser, allAppliedApplicants] = await Promise.all([
    getCompanyUser(user?.email),
    getAllAppliedApplicants(id),
  ]);

  if (!companyUser) {
    redirect("/create-form");
  }

  return (
    <main className="px-10 py-5 md:px-20 md:py-10 flex flex-col justify-between items-center max-h-full space-y-10">
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

      <div className="w-full max-w-full overflow-hidden">
        <ApplicantsTable allAppliedApplicants={allAppliedApplicants} />
      </div>
    </main>
  );
};

export default Page;
