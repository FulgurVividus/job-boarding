import ApplicantVacanciesList from "@/app/_components/ApplicantVacanciesList";
import SignOutButton from "@/app/_components/SignOutButton";
import { auth } from "@/app/_lib/auth";
import noUser from "@/public/no-user.png";
import { StaticImageData } from "next/image";
import React from "react";

type IUserImage = string | StaticImageData;

const Page: React.FC<IUserImage> = async () => {
  const session = await auth();
  const profilePictureUrl: IUserImage = session?.user?.image || noUser.src;
  const userName: string = session?.user?.name?.split(" ").at(0) || "User";

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
              className="h-8 w-8 rounded-full border-mainSalmon border-1 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <h1 className="mt-5 md:mt-10 text-lg md:text-2xl font-bold">
          <span className="text-mainSalmon">{userName}&apos;s</span> &quot;
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
