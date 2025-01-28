import React from "react";
import { createApplicantAction } from "@/app/_lib/actions";

interface ApplicantFormProps {
  user:
    | {
        id: number;
        email: string;
        role: string;
        fullName: string;
      }
    | undefined;
}

const ApplicantForm: React.FC<ApplicantFormProps> = ({ user }) => {
  return (
    <>
      <section className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-center mb-10 text-3xl md:text-6xl font-extrabold tracking-tight">
          <span className="text-gray-800 dark:text-gray-200">
            You must create the{" "}
          </span>
          <span className="text-mainSalmon drop-shadow-lg">applicant</span> form
        </h1>

        <form
          action={createApplicantAction}
          className="mt-10 flex flex-col justify-between"
        >
          {/* inputs div */}
          <div className="flex flex-col gap-6 w-full max-w-lg">
            <div className="flex items-center gap-3">
              <label
                htmlFor="fullName"
                className="font-sans text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 text-nowrap"
              >
                Full name:
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                defaultValue={user?.fullName}
                className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
              />
            </div>

            <div className="flex items-center gap-3">
              <label
                htmlFor="email"
                className="font-sans text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 text-nowrap"
              >
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                defaultValue={user?.email}
                className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
              />
            </div>

            <div className="flex items-center gap-3">
              <label
                htmlFor="yearsOfExperience"
                className="font-sans text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 text-nowrap"
              >
                Experience:
              </label>
              <input
                type="text"
                id="yearsOfExperience"
                name="yearsOfExperience"
                className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
              />
            </div>

            <div className="flex items-center gap-3">
              <label
                htmlFor="birthYear"
                className="font-sans text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 text-nowrap"
              >
                Birth year:
              </label>
              <input
                type="number"
                id="birthYear"
                name="birthYear"
                className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
              />
            </div>
          </div>

          <div className="flex items-center justify-start mt-10">
            <button
              className="uppercase bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-green-700 transition-all duration-200 text-sm md:text-base tracking-wide"
              title="Create applicant form"
              type="submit"
            >
              create
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default ApplicantForm;
