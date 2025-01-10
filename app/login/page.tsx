import React from "react";
import SignInButton from "@/app/_components/SignInButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page",
};

const Page: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-br from-mainSalmon via-mainBlue to-mainGreen drop-shadow-lg leading-relaxed">
          Sign in to{" "}
          <span className="text-mainSalmon font-extrabold underline decoration-wavy decoration-mainBlue underline-offset-4">
            access
          </span>{" "}
          the platform <span className="animate-bounce text-black">👋</span>
        </h2>

        <SignInButton />
      </div>
    </div>
  );
};

export default Page;
