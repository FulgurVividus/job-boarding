"use client";

import { publishCompanyVacancyAction } from "@/app/_lib/actions";
import {
  AcademicCapIcon,
  AtSymbolIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import React, { useTransition } from "react";
import toast from "react-hot-toast";
const SpinnerMini = dynamic(() => import("./SpinnerMini"));

interface AddCompanyVacancyProps {
  companyUser:
    | {
        id: number;
        companyName: string;
        location: string;
        contactEmail: string;
        contactNumber: string;
      }
    | undefined;
}

const AddCompanyVacancy: React.FC<AddCompanyVacancyProps> = ({
  companyUser,
}) => {
  const [isPending, startTransition] = useTransition();

  async function handlePublishCompanyVacancy(formData: FormData) {
    try {
      startTransition(() =>
        publishCompanyVacancyAction(formData).catch((error) => {
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
    <form
      action={handlePublishCompanyVacancy}
      className="mt-10 flex flex-col justify-between"
    >
      {/* inputs div */}
      <div className="flex flex-col gap-6 w-full max-w-lg">
        {/* Company ID */}
        <input type="hidden" value={companyUser?.id} name="company_id" />
        {/* Price */}
        <input type="hidden" value={4.0} name="price" />

        {/* Title Input */}
        <div className="flex items-center gap-3">
          <BriefcaseIcon className="h-6 w-6 text-mainBlue flex-shrink-0" />
          <label
            htmlFor="title"
            className="font-sans text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="E.g: Software Engineer"
            className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
          />
        </div>

        {/* Location Input */}
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
            id="vacancyLocation"
            name="vacancyLocation"
            required
            defaultValue={companyUser?.location}
            placeholder="E.g: London"
            className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
          />
        </div>

        {/* Experience Input */}
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
            id="experienceRequired"
            name="experienceRequired"
            required
            placeholder="E.g: 2 years"
            className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
          />
        </div>

        {/* Salary Input */}
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
            id="salary"
            name="salary"
            required
            placeholder="E.g: 100,000$"
            className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
          />
        </div>

        {/* Email Input */}
        <div className="flex items-center gap-3">
          <AtSymbolIcon className="h-6 w-6 text-mainBlue flex-shrink-0" />
          <label
            htmlFor="emailContact"
            className="font-sans text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200"
          >
            Email:
          </label>
          <input
            type="email"
            id="emailContact"
            name="emailContact"
            required
            defaultValue={companyUser?.contactEmail}
            placeholder="E.g: company@gmail.com"
            className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
          />
        </div>
      </div>

      <div className="flex items-center justify-start mt-10">
        <button
          className="add-company-vacancy-button disabled:cursor-not-allowed flex flex-grow-0 justify-center w-2/5"
          title="Publish the vacancy"
          type="submit"
          disabled={isPending}
        >
          {!isPending ? (
            <span>publish</span>
          ) : (
            <span className="mx-auto">
              <SpinnerMini />
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default AddCompanyVacancy;
