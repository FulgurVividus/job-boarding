import CompanyVacanciesList from "@/app/_components/CompanyVacanciesList";
import LinkButton from "@/app/_components/LinkButton";
import SignOutButton from "@/app/_components/SignOutButton";
import { auth } from "@/app/_lib/auth";
import { getCompanyInfo } from "@/app/_lib/services";
import { StaticImageData } from "next/image";
import React from "react";
import noUser from "@/public/no-user.png";
import { redirect } from "next/navigation";

type IUserImage = string | StaticImageData;

const Page: React.FC = async () => {
  // TODO: get company id dynamically
  const companyInfo = await getCompanyInfo(1);
  const { companyName } = await companyInfo;

  const session = await auth();

  const profilePictureUrl: IUserImage = session?.user?.image || noUser.src;
  const userName: string = session?.user?.name?.split(" ").at(0) || "User";
  const role: string | undefined = session?.user?.role;

  if (!role) {
    redirect("/role");
  }

  if (role !== "company") {
    redirect("/no-access");
  }

  // console.log(session);

  return (
    <>
      <main className="px-10 py-5 md:px-20 md:py-10 max-w-full">
        <div className="flex items-center justify-between">
          <SignOutButton />

          {/* TODO: search bar */}

          <div className="flex items-center gap-2 md:gap-5">
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
                className="h-8 w-8 rounded-full border-mainSalmon border-1 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        <h1 className="mt-5 md:mt-10 text-lg md:text-2xl font-bold">
          <span className="text-mainSalmon">{companyName}&apos;s</span>{" "}
          Vacancies Page
        </h1>

        <div className="mt-10">
          <CompanyVacanciesList />
        </div>
      </main>
    </>
  );
};

export default Page;
