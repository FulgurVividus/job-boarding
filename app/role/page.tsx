import React from "react";
import RoleChoice from "@/app/_components/RoleChoice";
import { auth } from "@/app/_lib/auth";
import WelcomeBack from "@/app/_components/WelcomeBack";

const Page: React.FC = async () => {
  const session = await auth();
  const user = session?.user;
  // console.log(user);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!user?.role ? <RoleChoice user={user} /> : <WelcomeBack user={user} />}
    </div>
  );
};

export default Page;
