import React from "react";
import SignInButton from "@/app/_components/SignInButton";

const Page: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-10">
        <h2 className="font-semibold text-xl">
          Sign in to{" "}
          <span className="text-mainSalmon font-extrabold">access</span> the
          platform 👋
        </h2>

        <SignInButton />
      </div>
    </div>
  );
};

export default Page;
