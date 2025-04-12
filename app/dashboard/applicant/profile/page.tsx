import { auth } from "@/app/_lib/auth";
import { getApplicantUser, getUser } from "@/app/_lib/services";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import React from "react";
const ApplicantProfile = dynamic(
  () => import("@/app/_components/ApplicantProfile")
);

export const metadata: Metadata = {
  title: "Profile",
  description: "Applicant can easily update his/her profile information",
};

const ApplicantProfilePage: React.FC = async () => {
  const session = await auth();
  const user = await getUser(session?.user?.email || "");
  const [role, applicantUser] = await Promise.all([
    user?.role,
    getApplicantUser(user?.email),
  ]);

  if (!session?.user?.email) {
    redirect("/login");
  }

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
      <ApplicantProfile applicantUser={applicantUser} />
    </>
  );
};

export default ApplicantProfilePage;
