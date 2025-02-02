"use client";

import React, { useTransition } from "react";
import { applyForVacancyAction } from "@/app/_lib/actions";
import {
  CalendarDaysIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  AtSymbolIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";
import { differenceInDays } from "date-fns";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SpinnerMini from "./SpinnerMini";

interface ApplyForVacancyProps {
  vacancy: {
    id: number;
    created_at: string;
    company_id: number;
    title: string;
    vacancyLocation: string;
    experienceRequired: string;
    salary: string;
    emailContact: string;
  };

  applicantId: number;
  status: string | null;
}

const ApplyForVacancy: React.FC<ApplyForVacancyProps> = ({
  vacancy,
  applicantId,
  status,
}) => {
  const [isPending, startTransition] = useTransition();

  const whenPublished = differenceInDays(
    new Date(),
    new Date(vacancy.created_at)
  );

  let whenPublishedText: string;

  if (whenPublished === 0) {
    whenPublishedText = "Today";
  } else if (whenPublished === 1) {
    whenPublishedText = "Yesterday";
  } else {
    whenPublishedText = `${whenPublished} days ago`;
  }

  const router = useRouter();

  async function handleApply(formData: FormData) {
    try {
      startTransition(() =>
        applyForVacancyAction(formData)
          .then(() => {
            toast.success(`You've successfully applied for ${vacancy.title}`);
            router.push("/dashboard/applicant/vacancies");
          })
          .catch((error) => {
            toast.error(error.message);
          })
      );
    } catch (error) {
      const errorHappen = error as Error;
      toast.error(errorHappen.message);
      console.log(errorHappen.message);
    }
  }

  return (
    <form action={handleApply} className="mt-10 flex flex-col justify-between">
      {/* inputs div */}
      <div className="flex flex-col gap-6 w-full max-w-lg">
        {/* Vacancy ID & Applicant ID */}
        <input type="hidden" value={vacancy.id} name="vacancy_id" />
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
            value={vacancy.experienceRequired}
            className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 outline-none"
          />
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
            value={vacancy.vacancyLocation}
            name="vacancyLocation"
            id="vacancyLocation"
            readOnly
            className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 outline-none"
          />
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
            value={vacancy.salary}
            className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 outline-none"
          />
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
            value={vacancy.emailContact}
            name="emailContact"
            id="emailContact"
            readOnly
            className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mt-10 gap-4">
        {(status === null || status === "" || !status) && (
          <button
            className="uppercase bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-green-700 transition-all duration-200 text-sm md:text-base tracking-wide disabled:cursor-not-allowed flex flex-grow-0 justify-center w-2/5"
            title="Apply for the vacancy"
            type="submit"
            disabled={isPending}
          >
            {!isPending ? (
              <span>Apply</span>
            ) : (
              <span className="mx-auto">
                <SpinnerMini />
              </span>
            )}
          </button>
        )}

        {status === "applied" && (
          <p className="text-yellow-600 bg-yellow-100 border border-yellow-300 rounded-lg px-4 py-2 text-sm md:text-base font-semibold tracking-wide shadow-sm">
            You&apos;ve applied
          </p>
        )}

        {status === "rejected" && (
          <p className="text-red-600 bg-red-100 border border-red-300 rounded-lg px-4 py-2 text-sm md:text-base font-semibold tracking-wide shadow-sm">
            You&apos;re rejected
          </p>
        )}

        {status === "accepted" && (
          <p className="text-green-600 bg-green-100 border border-green-300 rounded-lg px-4 py-2 text-sm md:text-base font-semibold tracking-wide shadow-sm">
            You&apos;re accepted
          </p>
        )}
      </div>
    </form>
  );
};

export default ApplyForVacancy;
