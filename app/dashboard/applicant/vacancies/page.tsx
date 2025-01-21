import ApplicantVacanciesList from "@/app/_components/ApplicantVacanciesList";
import PaginationApplicant from "@/app/_components/PaginationApplicant";
import SearchBarApplicant from "@/app/_components/SearchBarApplicant";
import SignOutButton from "@/app/_components/SignOutButton";
import { auth } from "@/app/_lib/auth";
import {
  getAllVacancies,
  getApplicantUser,
  getUser,
} from "@/app/_lib/services";
import noUser from "@/public/no-user.png";
import { StaticImageData } from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applicant's vacancies",
  description:
    "Applicant's vacancies page, where applicant can browse all available vacancies",
};

type IUserImage = string | StaticImageData;

export const revalidate = 1;

type SearchParams = Promise<{
  query?: string | undefined;
  page?: string | undefined;
  per_page?: string | undefined;
}>;

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const session = await auth();

  const profilePictureUrl: IUserImage = session?.user?.image || noUser.src;

  const user = await getUser(session?.user?.email || "");
  const role: string | undefined = user?.role;

  const applicantUser = await getApplicantUser(user?.email);
  const userName: string = applicantUser?.fullName?.split(" ").at(0) || "User";

  const searchParamsAwait = await searchParams;
  const query: string = searchParamsAwait?.query || "";

  // pagination

  const page = searchParamsAwait?.page ?? 1;
  const per_page = searchParamsAwait?.per_page ?? 8;
  const allVacancies = await getAllVacancies();

  const start: number = (Number(page) - 1) * Number(per_page);
  const end: number = start + Number(per_page);

  const paginatedAllVacancies = allVacancies?.slice(start, end);
  const allVacanciesLength: number = allVacancies?.length || 0;

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
      <main className="px-10 py-5 md:px-20 md:py-10 max-w-full">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <SignOutButton />

          <SearchBarApplicant placeholder={`Search for vacancies...`} />

          <div>
            <img
              src={profilePictureUrl}
              alt={`${userName}'s profile picture`}
              className="h-8 w-8 md:h-10 md:w-10 rounded-full border-mainSalmon border-1 object-cover"
              referrerPolicy="no-referrer"
              title="Profile picture"
            />
          </div>
        </div>

        <h1
          className="mt-5 md:mt-10 text-xl md:text-3xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100 bg-clip-text drop-shadow-md"
          style={{
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "0.05em",
            textShadow: "2px 2px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <span className="text-mainSalmon">{userName}&apos;s</span>{" "}
          &quot;Applicant Vacancies Page&quot;
        </h1>

        <div className="mt-10">
          <ApplicantVacanciesList
            paginatedAllVacancies={paginatedAllVacancies || []}
            query={query}
          />

          <div>
            <PaginationApplicant
              hasNextPage={end < allVacanciesLength}
              hasPrevPage={start > 0}
              allVacanciesLength={allVacanciesLength || 0}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
