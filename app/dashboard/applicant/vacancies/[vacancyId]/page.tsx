import { auth } from "@/app/_lib/auth";
import {
  getAllVacancies,
  getApplicantUser,
  getUser,
  getVacancy,
  getVacancyStatus,
} from "@/app/_lib/services";
import dynamic from "next/dynamic";
import { notFound, redirect } from "next/navigation";
const ApplyForVacancy = dynamic(
  () => import("@/app/_components/ApplyForVacancy")
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ vacancyId: string }>;
}) {
  const { vacancyId } = await params;
  const { title } = await getVacancy(+vacancyId);

  return {
    title: `${title}`,
  };
}

export async function generateStaticParams() {
  const allVacancies = await getAllVacancies();

  const allVacanciesId =
    allVacancies?.map((vacancy) => ({
      vacancyId: String(vacancy.id),
    })) || [];

  return allVacanciesId;
}

const Page = async ({ params }: { params: Promise<{ vacancyId: string }> }) => {
  const { vacancyId } = await params;

  const [vacancy, session] = await Promise.all([
    getVacancy(+vacancyId),
    auth(),
  ]);

  if (!session?.user?.email) {
    redirect("/login");
  }

  if (!vacancy) return notFound();

  const user = await getUser(session?.user?.email || "");
  const role: string | undefined = user?.role;

  if (!role) {
    redirect("/role");
  }

  if (role !== "applicant") {
    redirect("/no-access");
  }

  const applicantUser = await getApplicantUser(user?.email);
  const { id: applicantId } = applicantUser;

  if (!applicantUser) {
    redirect("/create-form");
  }

  const data = await getVacancyStatus(vacancy.id, applicantId);
  const status: string | null = data?.status;

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
