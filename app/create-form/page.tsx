import { auth } from "@/app/_lib/auth";
import { getApplicantUser, getCompanyUser, getUser } from "@/app/_lib/services";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import React from "react";
const CompanyForm = dynamic(() => import("@/app/_components/CompanyForm"));
const ApplicantForm = dynamic(() => import("@/app/_components/ApplicantForm"));
const WelcomeBack = dynamic(() => import("@/app/_components/WelcomeBack"));

export const metadata: Metadata = {
  title: "Create-form",
  description:
    "All users must create form by filling specific data according to their chosen role",
};

interface CreateFormI {
  fullName: string | undefined;
  role: string | undefined;
}

const Page: React.FC = async () => {
  const session = await auth();

  if (!session?.user?.role) {
    redirect("/role");
  }

  const user = await getUser(session?.user?.email || "");

  const fullName: string | undefined = user?.fullName;
  const role: string | undefined = user?.role;

  const [applicantUser, companyUser] = await Promise.all([
    getApplicantUser(user?.email),
    getCompanyUser(user?.email),
  ]);

  const createForm: CreateFormI = { fullName, role };

  return (
    <>
      {applicantUser === null && companyUser === null ? (
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
