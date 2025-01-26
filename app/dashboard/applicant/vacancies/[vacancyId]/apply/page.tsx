// TODO: delete this page

import { auth } from "@/app/_lib/auth";
import { getApplicantUser, getUser, getVacancy } from "@/app/_lib/services";
import { redirect } from "next/navigation";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Applicant can easily apply for the vacancy by submitting the form",
};

const Page = async ({ params }: { params: Promise<{ vacancyId: string }> }) => {
  const { vacancyId } = await params;
  const { title } = await getVacancy(+vacancyId);

  const session = await auth();

  const user = await getUser(session?.user?.email || "");
  const role: string | undefined = user?.role;

  const applicantUser = await getApplicantUser(user?.email);

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
      <main className="px-10 py-5 md:px-20 md:py-10 flex flex-col items-center max-h-full h-screen">
        <h1 className="text-center mb-10 text-3xl md:text-6xl font-extrabold tracking-tight">
          <span className="text-gray-800 drop-shadow-lg">Apply for</span>{" "}
          <span className="text-mainSalmon dark:text-gray-200">{title}</span>
        </h1>

        <form action="" className="flex flex-col justify-between">
          <section className="flex flex-col justify-center mx-auto">
            <div className="text-lg flex items-center gap-2">
              <label htmlFor="name" className="font-serif font-medium">
                Full name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={applicantUser?.fullName}
                required
                placeholder="E.g: John Doe"
                className="outline-none bg-transparent"
              />
            </div>

            <div className="text-lg flex items-center gap-2">
              <label htmlFor="email" className="font-serif font-medium">
                Email:
              </label>
              <input
                type="text"
                name="email"
                id="email"
                defaultValue={applicantUser?.email}
                required
                placeholder="E.g: john@gmail.com"
                className="outline-none bg-transparent"
              />
            </div>

            <div className="text-lg flex items-center gap-2">
              <label htmlFor="experience" className="font-serif font-medium">
                Experience:
              </label>
              <input
                type="text"
                name="experience"
                id="experience"
                required
                className="outline-none bg-transparent"
              />
            </div>

            <div className="text-lg flex items-center gap-2">
              <label htmlFor="birthYear" className="font-serif font-medium">
                Birth year:
              </label>
              <input
                type="number"
                name="birthYear"
                id="birthYear"
                defaultValue={applicantUser?.birthYear}
                required
                placeholder="E.g: 20"
                className="outline-none bg-transparent"
              />
            </div>
          </section>

          <div className="mt-10 flex justify-center">
            <button
              title="Apply for this vacancy"
              className="py-5 px-10 bg-mainBlue bg-gradient-to-r from-mainSalmon to-mainBlue transition-all duration-300 hover:scale-95 font-semibold text-mainWhite hover:text-mainBlack rounded-3xl text-center"
            >
              Apply
            </button>
          </div>
        </form>
      </main>

      {/*  */}

      <form action="" className="mt-10 flex flex-col justify-between">
        {/* inputs div */}
        <div className="flex flex-col gap-6 w-full max-w-lg">
          {/* Vacancy ID */}
          {/* <input type="hidden" value={id} name="id" /> */}

          {/* Full name */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="name"
              className="font-sans text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 text-nowrap"
            >
              Full name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={applicantUser?.fullName}
              className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
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
              defaultValue={applicantUser?.email}
              className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
            />
          </div>

          {/* Experience */}
          <div className="flex items-center gap-3">
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
              className="w-full bg-gray-100 dark:bg-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-10 gap-4">
          <button
            className="uppercase bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-green-700 transition-all duration-200 text-sm md:text-base tracking-wide"
            title="Update the vacancy"
            type="submit"
          >
            Apply
          </button>
        </div>
      </form>
    </>
  );
};

export default Page;
