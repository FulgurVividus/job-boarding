import CompanyVacanciesList from "@/app/_components/CompanyVacanciesList";
import LinkButton from "@/app/_components/LinkButton";
import SignOutButton from "@/app/_components/SignOutButton";
import { auth } from "@/app/_lib/auth";
import { getCompanyUser, getUser } from "@/app/_lib/services";
import { StaticImageData } from "next/image";
import React from "react";
import noUser from "@/public/no-user.png";
import { redirect } from "next/navigation";

type IUserImage = string | StaticImageData;

const Page: React.FC = async () => {
  // TODO: get company id dynamically

  const session = await auth();

  const profilePictureUrl: IUserImage = session?.user?.image || noUser.src;

  const user = await getUser(session?.user?.email || "");
  const role: string | undefined = user?.role;

  const companyUser = await getCompanyUser(user?.email);
  const userName: string = companyUser?.companyName?.split(" ").at(0) || "User";

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
          <CompanyVacanciesList />
        </div>
      </main>
    </>
  );
};

export default Page;
