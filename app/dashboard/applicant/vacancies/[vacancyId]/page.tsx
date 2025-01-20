import {
  getAllVacancies,
  getApplicantUser,
  getUser,
  getVacancy,
} from "@/app/_lib/services";
import { differenceInDays } from "date-fns";
import React from "react";
import {
  CalendarDaysIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  AtSymbolIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";
import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { vacancyId: string };
}) {
  const { vacancyId } = await params;
  const { title } = await getVacancy(+vacancyId);

  return {
    title: `${title}`,
  };
}

interface PageProps {
  params: {
    vacancyId: string;
  };
}

export const revalidate = 1;
export const dynamicParams = true;

export async function generateStaticParams() {
  const allVacancies = await getAllVacancies();

  const allVacanciesId = allVacancies?.map((vacancy) => ({
    vacancyId: String(vacancy.id),
  }));

  return allVacanciesId;
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { vacancyId } = await params;
  const {
    id,
    created_at,
    // company_id,
    title,
    vacancyLocation,
    experienceRequired,
    salary,
    emailContact,
  } = await getVacancy(+vacancyId);

  const session = await auth();

  const user = await getUser(session?.user?.email || "");
  const role: string | undefined = user?.role;

  const applicantUser = await getApplicantUser(user?.email);
  const { id: applicantId } = applicantUser;

  if (!role) {
    redirect("/role");
  }

  if (role !== "applicant") {
    redirect("/no-access");
  }

  if (!applicantUser) {
    redirect("/create-form");
  }

  const whenPublished = differenceInDays(new Date(), new Date(created_at));

  let whenPublishedText: string;

  if (whenPublished === 0) {
    whenPublishedText = "Today";
  } else if (whenPublished === 1) {
    whenPublishedText = "Yesterday";
  } else {
    whenPublishedText = `${whenPublished} days ago`;
  }

  return (
    <>
      <main className="px-10 py-5 md:px-20 md:py-10 flex flex-col justify-between items-center max-h-full">
        <h1 className="text-center mb-10 text-3xl md:text-6xl font-extrabold tracking-tight">
          <span className="text-mainSalmon drop-shadow-lg">{title}</span>{" "}
          <span className="text-gray-800 dark:text-gray-200">Vacancy Page</span>
        </h1>

        <form className="mt-10 flex flex-col justify-between">
          {/* inputs div */}
          <div className="flex flex-col gap-6 w-full max-w-lg">
            {/* Vacancy ID */}
            <input type="hidden" value={id} name="vacancy_id" />
            <input type="hidden" value={applicantId} name="applicant_id" />

            {/* Published */}
            <div className="flex items-center gap-3">
              <CalendarDaysIcon className="h-6 w-6 text-mainBlue flex-shrink-0" />
              <label
                htmlFor="whenPublishedText"
                className="font-sans text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200"
              >
                Published:
              </label>
              <input
                type="text"
                name="whenPublishedText"
                id="whenPublishedText"
                readOnly
                value={whenPublishedText}
                className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 outline-none"
              />
              {/* <span className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue">
                {whenPublishedText}
              </span> */}
            </div>

            {/* Experience */}
            <div className="flex items-center gap-3">
              <AcademicCapIcon className="h-6 w-6 text-mainBlue flex-shrink-0" />
              <label
                htmlFor="experienceRequired"
                className="font-sans text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200"
              >
                Experience:
              </label>
              <input
                type="text"
                name="experienceRequired"
                id="experienceRequired"
                readOnly
                value={experienceRequired}
                className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 outline-none"
              />
              {/* <span className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue">
                {experienceRequired}
              </span> */}
            </div>

            {/* Location */}
            <div className="flex items-center gap-3">
              <MapPinIcon className="h-6 w-6 text-mainBlue flex-shrink-0" />
              <label
                htmlFor="vacancyLocation"
                className="font-sans text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200"
              >
                Location:
              </label>
              <input
                type="text"
                value={vacancyLocation}
                name="vacancyLocation"
                id="vacancyLocation"
                readOnly
                className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 outline-none"
              />
              {/* <span className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue">
                {vacancyLocation}
              </span> */}
            </div>

            {/* Salary */}
            <div className="flex items-center gap-3">
              <CurrencyDollarIcon className="h-6 w-6 text-mainBlue flex-shrink-0" />
              <label
                htmlFor="salary"
                className="font-sans text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200"
              >
                Salary:
              </label>
              <input
                type="text"
                name="salary"
                id="salary"
                readOnly
                value={salary}
                className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 outline-none"
              />
              {/* <span className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue">
                {salary}
              </span> */}
            </div>

            {/* Contact */}
            <div className="flex items-center gap-3">
              <AtSymbolIcon className="h-6 w-6 text-mainBlue flex-shrink-0" />
              <label
                htmlFor="emailContact"
                className="font-sans text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200"
              >
                Contact:
              </label>
              <input
                type="text"
                value={emailContact}
                name="emailContact"
                id="emailContact"
                readOnly
                className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 outline-none"
              />
              {/* <span className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue">
                {emailContact}
              </span> */}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mt-10 gap-4">
            <button
              className="uppercase bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-green-700 transition-all duration-200 text-sm md:text-base tracking-wide"
              title="Apply for the vacancy"
              type="submit"
            >
              Apply
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default Page;
