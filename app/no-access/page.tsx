import React from "react";
import { auth } from "@/app/_lib/auth";
import GoBack from "@/app/_components/GoBack";

const Page: React.FC = async () => {
  const session = await auth();
  const role: string | undefined = session?.user?.role;

  let fallbackURL: string;

  if (role === "company") {
    fallbackURL = "/dashboard/company/vacancies";
  } else {
    fallbackURL = "/dashboard/applicant/vacancies";
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="font-semibold text-xl text-center">No access 🛑</h1>
      <h1 className="font-semibold text-xl mt-2 text-center">
        You cannot access because your role is{" "}
        <span className="text-mainSalmon font-extrabold capitalize">
          {session?.user?.role || "undefined"}
        </span>
      </h1>

      <div>
        <GoBack fallbackURL={fallbackURL}>Go back</GoBack>
      </div>
    </div>
  );
};

export default Page;
