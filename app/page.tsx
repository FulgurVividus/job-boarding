import type { Metadata } from "next";
import React from "react";
import BigScreenMainPage from "./_components/BigScreenMainPage";
import SmallScreenMainPage from "./_components/SmallScreenMainPage";

export const metadata: Metadata = {
  title: "Jobless | Home",
  description: "Welcome to Jobless",
};

const Page: React.FC = () => {
  return (
    <>
      <div className="hidden md:block">
        <BigScreenMainPage />
      </div>

      <div className="md:hidden">
        <SmallScreenMainPage />
      </div>
    </>
  );
};

export default Page;
