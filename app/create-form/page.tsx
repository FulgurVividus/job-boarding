import React from "react";
import { auth } from "@/app/_lib/auth";
import { getUser } from "@/app/_lib/services";
import CompanyForm from "@/app/_components/CompanyForm";
import ApplicantForm from "@/app/_components/ApplicantForm";
import { redirect } from "next/navigation";
import WelcomeBack from "@/app/_components/WelcomeBack";

interface CreateFormI {
  fullName: string | undefined;
  role: string | undefined;
}

const Page: React.FC = async () => {
  const session = await auth();
  const user = await getUser(session?.user?.email || "");

  const fullName: string | undefined = user?.fullName;
  const role: string | undefined = user?.role;

  const createForm: CreateFormI = { fullName, role };

  if (!session?.user?.role) {
    redirect("/role");
  }

  return (
    <>
      {!user?.role ? (
        <section>
          {user?.role === "company" ? (
            <CompanyForm user={user} />
          ) : (
            <ApplicantForm user={user} />
          )}
        </section>
      ) : (
        <WelcomeBack createForm={createForm} />
      )}
    </>
  );
};

export default Page;
