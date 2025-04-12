import { auth } from "@/app/_lib/auth";
import {
  getCompanyAllVacancies,
  getCompanyUser,
  getUser,
} from "@/app/_lib/services";
import noUser from "@/public/no-user.png";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { StaticImageData } from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
const CompanyVacanciesList = dynamic(
  () => import("@/app/_components/CompanyVacanciesList")
);
const LinkButton = dynamic(() => import("@/app/_components/LinkButton"));
const SignOutButton = dynamic(() => import("@/app/_components/SignOutButton"));
const SearchBarCompany = dynamic(
  () => import("@/app/_components/SearchBarCompany")
);
const PaginationCompany = dynamic(
  () => import("@/app/_components/PaginationCompany")
);

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Company's vacancies",
  description:
    "Company's vacancies page, where vacancies belong to specific company created by",
};

type IUserImage = string | StaticImageData;

type SearchParams = Promise<{
  query?: string;
  page?: string;
  per_page?: string;
}>;

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const [user, searchParamsAwait] = await Promise.all([
    getUser(session?.user?.email || ""),
    searchParams,
  ]);
  const role: string | undefined = user?.role;

  if (!role) {
    redirect("/role");
  }

  if (role !== "company") {
    redirect("/no-access");
  }

  const companyUser = await getCompanyUser(user?.email);

  if (!companyUser) {
    redirect("/create-form");
  }

  const companyAllVacancies = await getCompanyAllVacancies(companyUser?.id);

  // other stuff

  const userName: string = companyUser?.companyName?.split(" ").at(0) || "User";
  const profilePictureUrl: IUserImage = session?.user?.image || noUser.src;

  // pagination

  const page = searchParamsAwait?.page ?? 1;
  const per_page = searchParamsAwait?.per_page ?? 8;

  const start: number = (Number(page) - 1) * Number(per_page);
  const end: number = start + Number(per_page);

  const paginatedCompanyAllVacancies = companyAllVacancies?.slice(start, end);
  const companyAllVacanciesLength: number = companyAllVacancies?.length || 0;

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
              <Link href={"/dashboard/company/profile"}>
                <img
                  src={profilePictureUrl}
                  alt={`${userName}'s profile picture`}
                  className="h-8 w-8 md:h-10 md:w-10 rounded-full border-mainSalmon border-1 object-cover"
                  referrerPolicy="no-referrer"
                  title="Go to profile page"
                />
              </Link>
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
