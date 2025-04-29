"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { updateCompanyProfileAction } from "@/app/_lib/actions";
import toast from "react-hot-toast";

interface CompanyProfileProps {
  companyUser: {
    id: number;
    companyName: string;
    location: string;
    contactEmail: string;
    contactNumber: string;
  };
}

const CompanyProfile: React.FC<CompanyProfileProps> = ({ companyUser }) => {
  const { id, companyName, location, contactEmail, contactNumber } =
    companyUser;

  return (
    <section className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-center mb-10 text-3xl md:text-6xl font-extrabold tracking-tight">
        <span className="text-mainSalmon drop-shadow-lg">{companyName}</span>{" "}
        <span className="text-gray-800">profile cabinet</span>
      </h1>

      <form
        className="mt-10 flex flex-col justify-between"
        action={updateCompanyProfileAction}
      >
        {/* inputs div */}
        <div className="flex flex-col gap-6 w-full max-w-lg">
          {/* Company ID */}
          <input type="hidden" value={id} name="id" />

          <div className="flex items-center gap-3">
            <label
              htmlFor="companyName"
              className="font-sans text-base md:text-lg font-semibold text-gray-800 text-nowrap"
            >
              Company name:
            </label>
            <input
              required
              type="text"
              id="companyName"
              name="companyName"
              defaultValue={companyName}
              className="w-full bg-gray-100 text-sm md:text-base text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
            />
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="location"
              className="font-sans text-base md:text-lg font-semibold text-gray-800 text-nowrap"
            >
              Location:
            </label>
            <input
              required
              type="text"
              id="location"
              name="location"
              defaultValue={location}
              className="w-full bg-gray-100 text-sm md:text-base text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
            />
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="contactEmail"
              className="font-sans text-base md:text-lg font-semibold text-gray-800 text-nowrap"
            >
              Contact email:
            </label>
            <input
              required
              type="email"
              id="contactEmail"
              name="contactEmail"
              defaultValue={contactEmail}
              className="w-full bg-gray-100 text-sm md:text-base text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
            />
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="contactNumber"
              className="font-sans text-base md:text-lg font-semibold text-gray-800 text-nowrap"
            >
              Contact number:
            </label>
            <input
              required
              type="text"
              id="contactNumber"
              name="contactNumber"
              defaultValue={contactNumber}
              className="w-full bg-gray-100 text-sm md:text-base text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
            />
          </div>
        </div>

        <div className="flex items-center justify-start mt-10">
          <UpdateButton />
        </div>
      </form>
    </section>
  );
};

const UpdateButton: React.FC = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className="company-form-button disabled:cursor-not-allowed flex flex-grow-0 justify-center w-2/5"
      title="Update company profile"
      type="submit"
      disabled={pending}
      onClick={() => toast.success("Profile successfully updated!")}
    >
      {pending ? "updating..." : "update"}
    </button>
  );
};

export default CompanyProfile;
