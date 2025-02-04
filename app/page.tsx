import type { Metadata } from "next";
import dynamic from "next/dynamic";
import React from "react";
const BigScreenMainPage = dynamic(
  () => import("./_components/BigScreenMainPage")
);
const SmallScreenMainPage = dynamic(
  () => import("./_components/SmallScreenMainPage")
);

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
