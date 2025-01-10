import CompanyVacanciesList from "@/app/_components/CompanyVacanciesList";
import LinkButton from "@/app/_components/LinkButton";
import SignOutButton from "@/app/_components/SignOutButton";
import { auth } from "@/app/_lib/auth";
import {
  getCompanyAllVacancies,
  getCompanyUser,
  getUser,
} from "@/app/_lib/services";
import { StaticImageData } from "next/image";
import React from "react";
import noUser from "@/public/no-user.png";
import { redirect } from "next/navigation";
import SearchBarCompany from "@/app/_components/SearchBarCompany";
import PaginationCompany from "@/app/_components/PaginationCompany";

type IUserImage = string | StaticImageData;

interface SearchParams {
  searchParams?: {
    query?: string;
    page?: string;
    per_page?: string;
  };
}

const Page: React.FC<SearchParams> = async ({ searchParams }) => {
  const session = await auth();

  const profilePictureUrl: IUserImage = session?.user?.image || noUser.src;

  const user = await getUser(session?.user?.email || "");
  const role: string | undefined = user?.role;

  const companyUser = await getCompanyUser(user?.email);
  const userName: string = companyUser?.companyName?.split(" ").at(0) || "User";

  const searchParamsAwait = await searchParams;
  const query: string = searchParamsAwait?.query || "";

  // pagination

  const page = searchParamsAwait?.page ?? 1;
  const per_page = searchParamsAwait?.per_page ?? 8;
  const companyAllVacancies = await getCompanyAllVacancies(companyUser?.id);

  const start: number = (Number(page) - 1) * Number(per_page);
  const end: number = start + Number(per_page);

  const paginatedCompanyAllVacancies = companyAllVacancies?.slice(start, end);
  const companyAllVacanciesLength: number = companyAllVacancies?.length || 0;

  if (!role) {
    redirect("/role");
  }

  if (role !== "company") {
    redirect("/no-access");
  }

  if (!companyUser) {
    redirect("/create-form");
  }

  return (
    <>
      <main className="px-10 py-5 md:px-20 md:py-10 max-w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          <div className="order-1 md:order-none">
            <SignOutButton />
          </div>

          <SearchBarCompany placeholder={`Search ${userName}'s vacancies...`} />

          <div className="flex items-center gap-1 md:gap-2 order-1 md:order-none">
            <LinkButton
              href={`/dashboard/company/vacancies/add`}
              title="Add a vacancy"
              className="uppercase font-semibold py-2 px-5"
            >
              add
            </LinkButton>

            <div>
              <img
                src={profilePictureUrl}
                alt={`${userName}'s profile picture`}
                className="h-8 w-8 md:h-10 md:w-10 rounded-full border-mainSalmon border-1 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
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
          <span className="text-mainSalmon">{userName}&apos;s</span> Vacancies
          Page
        </h1>

        <div className="mt-10">
          <CompanyVacanciesList
            query={query}
            paginatedCompanyAllVacancies={paginatedCompanyAllVacancies || []}
          />

          <div className="mt-10 flex justify-center items-center">
            <PaginationCompany
              hasNextPage={end < companyAllVacanciesLength}
              hasPrevPage={start > 0}
              companyAllVacanciesLength={companyAllVacanciesLength || 0}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
