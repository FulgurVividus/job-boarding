import { auth } from "@/app/_lib/auth";
import { getCompanyUser, getUser } from "@/app/_lib/services";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import React from "react";
const CompanyProfile = dynamic(
  () => import("@/app/_components/CompanyProfile")
);

export const metadata: Metadata = {
  title: "Profile",
  description: "Company can easily update its profile information",
};

const CompanyProfilePage: React.FC = async () => {
  const session = await auth();
  const user = await getUser(session?.user?.email || "");
  const [role, companyUser] = await Promise.all([
    user?.role,
    getCompanyUser(user?.email),
  ]);

  if (!session?.user?.email) {
    redirect("/login");
  }

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
      <CompanyProfile companyUser={companyUser} />
    </>
  );
};

export default CompanyProfilePage;
