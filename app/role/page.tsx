import { auth } from "@/app/_lib/auth";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import React from "react";
const RoleChoice = dynamic(() => import("@/app/_components/RoleChoice"));
const WelcomeBack = dynamic(() => import("@/app/_components/WelcomeBack"));

export const metadata: Metadata = {
  title: "Role",
  description:
    "Before using the platform, user must choose the role (applicant or company)",
};

const Page: React.FC = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!user?.role ? <RoleChoice user={user} /> : <WelcomeBack user={user} />}
    </div>
  );
};

export default Page;
