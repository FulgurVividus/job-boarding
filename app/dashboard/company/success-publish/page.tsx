import { Metadata } from "next";
import dynamic from "next/dynamic";
const SuccessPublish = dynamic(
  () => import("@/app/_components/SuccessPublish")
);

export const metadata: Metadata = {
  title: "Success Publish",
  description: "Successfully published a vacancy",
};

const SuccessPublishPage = () => {
  return (
    <>
      <SuccessPublish />
    </>
  );
};

export default SuccessPublishPage;
