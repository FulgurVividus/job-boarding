import LinkButton from "@/app/_components/LinkButton";
import { getVacancy } from "@/app/_lib/services";
import { differenceInDays } from "date-fns";
import React from "react";
import {
  CalendarDaysIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  AtSymbolIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";

interface PageProps {
  params: {
    vacancyId: string;
  };
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
      <main className="px-10 py-5 md:px-20 md:py-10 flex flex-col justify-between items-center max-h-full h-screen">
        <section className="flex flex-col items-center">
          <h1 className="text-center mb-10 text-4xl md:text-8xl font-extrabold">
            {title}
          </h1>
          <div className="flex flex-col gap-3 md:gap-5">
            <p className="text-lg flex items-center gap-2">
              <CalendarDaysIcon className="h-5 w-5" />
              <span className="font-serif font-medium">Published:</span>{" "}
              {whenPublishedText}
            </p>
            <p className="text-lg flex items-center gap-2">
              <AcademicCapIcon className="h-5 w-5" />
              <span className="font-serif font-medium">
                Experience required:
              </span>{" "}
              {experienceRequired} years
            </p>
            <p className="text-lg flex items-center gap-2">
              <MapPinIcon className="h-5 w-5" />
              <span className="font-serif font-medium">Location:</span>{" "}
              {vacancyLocation}
            </p>
            <p className="text-lg flex items-center gap-2">
              <CurrencyDollarIcon className="h-5 w-5" />
              <span className="font-serif font-medium">Salary:</span> {salary}
            </p>
            <p className="text-lg flex items-center gap-2">
              <AtSymbolIcon className="h-5 w-5" />
              <span className="font-serif font-medium">Contact:</span>{" "}
              {emailContact}
            </p>
          </div>
        </section>

        <LinkButton
          href={`/dashboard/applicant/vacancies/${id}/apply`}
          className="py-5"
          title="Apply for this vacancy link"
        >
          Go for
        </LinkButton>
      </main>
    </>
  );
};

export default Page;
