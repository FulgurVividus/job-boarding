"use client";

import React, { useTransition } from "react";
import {
  BriefcaseIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  AtSymbolIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";
import {
  updateCompanyVacancyAction,
  deleteCompanyVacancyAction,
} from "@/app/_lib/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SpinnerMini from "./SpinnerMini";

interface UpdateCompanyVacancyProps {
  id: number;
  title: string;
  vacancyLocation: string;
  experienceRequired: number;
  salary: string;
  emailContact: string;
}

const UpdateCompanyVacancy: React.FC<UpdateCompanyVacancyProps> = ({
  id,
  title,
  vacancyLocation,
  experienceRequired,
  salary,
  emailContact,
}) => {
  const router = useRouter();
  const [isUpdating, startUpdateTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();

  // update
  async function handleUpdate(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      const form = e.currentTarget.form!;
      startUpdateTransition(() =>
        updateCompanyVacancyAction(new FormData(form))
          .then(() => {
            toast.success(`Vacancy ${title}'s updated successfully`);
            router.push("/dashboard/company/vacancies");
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

  // delete
  async function handleDelete(id: number) {
    try {
      startDeleteTransition(() =>
        deleteCompanyVacancyAction(id)
          .then(() => {
            toast.success(`${title} was successfully deleted`);
            router.push("/dashboard/company/vacancies");
          })
          .catch((error) => {
            toast.error(error.message);
          })
      );
    } catch (error) {
      const errorHappen = error as Error;
      toast.error(errorHappen.message);
    }
  }

  return (
    <form className="mt-10 flex flex-col justify-between">
      {/* inputs div */}
      <div className="flex flex-col gap-6 w-full max-w-lg">
        {/* Vacancy ID */}
        <input type="hidden" value={id} name="id" />

        {/* Title */}
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
            defaultValue={title}
            className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
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
            id="vacancyLocation"
            name="vacancyLocation"
            defaultValue={vacancyLocation}
            className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
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
            id="experienceRequired"
            name="experienceRequired"
            defaultValue={experienceRequired}
            className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
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
            id="salary"
            name="salary"
            defaultValue={salary}
            className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
          />
        </div>

        {/* Email */}
        <div className="flex items-center gap-3">
          <AtSymbolIcon className="h-6 w-6 text-mainBlue flex-shrink-0" />
          <label
            htmlFor="emailContact"
            className="font-sans text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200"
          >
            Email:
          </label>
          <input
            type="text"
            id="emailContact"
            name="emailContact"
            defaultValue={emailContact}
            className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mt-10 gap-4">
        <button
          className="uppercase bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-green-700 transition-all duration-200 text-sm md:text-base tracking-wide disabled:cursor-not-allowed flex flex-grow justify-center w-1/2"
          title="Update the vacancy"
          type="submit"
          onClick={handleUpdate}
          disabled={isUpdating}
        >
          {!isUpdating ? (
            <span>Update</span>
          ) : (
            <span className="mx-auto">
              <SpinnerMini />
            </span>
          )}
        </button>

        <button
          className="uppercase bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-red-700 transition-all duration-200 text-sm md:text-base tracking-wide disabled:cursor-not-allowed flex flex-grow justify-center w-1/2"
          title="Delete the vacancy"
          type="button"
          onClick={() => handleDelete(id)}
          disabled={isDeleting}
        >
          {!isDeleting ? (
            <span>Delete</span>
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

export default UpdateCompanyVacancy;
