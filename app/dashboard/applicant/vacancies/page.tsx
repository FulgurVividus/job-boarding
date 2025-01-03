import ApplicantVacanciesList from "@/app/_components/ApplicantVacanciesList";
import SignOutButton from "@/app/_components/SignOutButton";
import { auth } from "@/app/_lib/auth";
import { getApplicantUser, getUser } from "@/app/_lib/services";
import noUser from "@/public/no-user.png";
import { StaticImageData } from "next/image";
import { redirect } from "next/navigation";
import React from "react";

type IUserImage = string | StaticImageData;

const Page: React.FC<IUserImage> = async () => {
  const session = await auth();

  const profilePictureUrl: IUserImage = session?.user?.image || noUser.src;

  const user = await getUser(session?.user?.email || "");
  const role: string | undefined = user?.role;

  const applicantUser = await getApplicantUser(user?.email);
  const userName: string = applicantUser?.fullName?.split(" ").at(0) || "User";

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
        <div className="flex items-center justify-between">
          <SignOutButton />

          {/* TODO: search bar */}

          {/* TODO: add filters */}

          <div>
            <img
              src={profilePictureUrl}
              alt={`${userName}'s profile picture`}
              className="h-8 w-8 md:h-10 md:w-10 rounded-full border-mainSalmon border-1 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <h1
          className="mt-5 md:mt-10 text-xl md:text-3xl font-extrabold text-center tracking-tight text-gray-800 dark:text-gray-100 bg-gradient-to-r from-mainSalmon via-mainBlue to-mainGreen bg-clip-text text-transparent drop-shadow-md"
          style={{
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "0.05em",
            textShadow: "2px 2px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <span className="text-mainSalmon underline decoration-wavy decoration-mainBlue underline-offset-4">
            {userName}&apos;s
          </span>{" "}
          &quot;
          <span className="underline decoration-wavy decoration-mainSalmon underline-offset-[4.5px]">
            Applicant
          </span>{" "}
          Vacancies Page&quot;
        </h1>

        <div className="mt-10">
          <ApplicantVacanciesList />
        </div>
      </main>
    </>
  );
};

export default Page;
