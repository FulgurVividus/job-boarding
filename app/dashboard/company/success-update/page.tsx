import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const SuccessUpdate = dynamic(() => import("@/app/_components/SuccessUpdate"));

export const metadata: Metadata = {
  title: "Success Update",
  description: "Successfully updated a vacancy",
};

const SuccessUpdatePage: React.FC = () => {
  return (
    <>
      <SuccessUpdate />
    </>
  );
};

export default SuccessUpdatePage;
