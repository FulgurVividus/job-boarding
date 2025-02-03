"use client";

import React from "react";
import { createCompanyAction } from "@/app/_lib/actions";
import { useFormStatus } from "react-dom";

interface CompanyFormProps {
  user:
    | {
        id: number;
        email: string;
        role: string;
        fullName: string;
      }
    | undefined;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ user }) => {
  return (
    <>
      <section className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-center mb-10 text-3xl md:text-6xl font-extrabold tracking-tight">
          <span className="text-gray-800 dark:text-gray-200">
            You must create the{" "}
          </span>
          <span className="text-mainSalmon drop-shadow-lg">company</span> form
        </h1>

        <form
          action={createCompanyAction}
          className="mt-10 flex flex-col justify-between"
        >
          {/* inputs div */}
          <div className="flex flex-col gap-6 w-full max-w-lg">
            <div className="flex items-center gap-3">
              <label
                htmlFor="companyName"
                className="font-sans text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 text-nowrap"
              >
                Company name:
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
              />
            </div>

            <div className="flex items-center gap-3">
              <label
                htmlFor="location"
                className="font-sans text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 text-nowrap"
              >
                Location:
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
              />
            </div>

            <div className="flex items-center gap-3">
              <label
                htmlFor="contactEmail"
                className="font-sans text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 text-nowrap"
              >
                Contact email:
              </label>
              <input
                type="text"
                id="contactEmail"
                name="contactEmail"
                defaultValue={user?.email}
                className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
              />
            </div>

            <div className="flex items-center gap-3">
              <label
                htmlFor="contactNumber"
                className="font-sans text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 text-nowrap"
              >
                Contact number:
              </label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
              />
            </div>
          </div>

          <div className="flex items-center justify-start mt-10">
            <CreateButton />
          </div>
        </form>
      </section>
    </>
  );
};

export default CompanyForm;

const CreateButton: React.FC = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className="company-form-button disabled:cursor-not-allowed flex flex-grow-0 justify-center w-2/5"
      title="Create company form"
      type="submit"
      disabled={pending}
    >
      {pending ? "creating..." : "create"}
    </button>
  );
};
