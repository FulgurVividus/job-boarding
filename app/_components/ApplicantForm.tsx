import React from "react";
import { createApplicantAction } from "@/app/_lib/actions";

interface ApplicantFormProps {
  user:
    | {
        id: number;
        email: string;
        role: string;
        fullName: string;
      }
    | undefined;
}

const ApplicantForm: React.FC<ApplicantFormProps> = ({ user }) => {
  return (
    <>
      <section className="flex flex-col justify-center items-center h-screen">
        <h1 className="font-semibold text-center mb-10 text-2xl md:text-4xl">
          You must create the{" "}
          <span className="text-mainSalmon font-extrabold">applicant</span> form
        </h1>

        <form
          action={createApplicantAction}
          className="mt-10 flex flex-col justify-between"
        >
          {/* inputs div */}
          <div className="flex flex-col gap-5 w-full max-w-lg">
            <div className="flex items-center gap-2">
              <label
                htmlFor="fullName"
                className="font-serif text-lg font-semibold"
              >
                Full name:
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                defaultValue={user?.fullName}
                className="bg-transparent text-lg outline-none flex-1"
              />
            </div>

            <div className="flex items-center gap-3 md:gap-2">
              <label
                htmlFor="email"
                className="font-serif text-lg font-semibold"
              >
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                defaultValue={user?.email}
                className="bg-transparent text-lg outline-none flex-1"
              />
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="yearsOfExperience"
                className="font-serif text-lg font-semibold"
              >
                Years of experience:
              </label>
              <input
                type="number"
                id="yearsOfExperience"
                name="yearsOfExperience"
                className="bg-transparent text-lg outline-none flex-1"
              />
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="birthYear"
                className="font-serif text-lg font-semibold"
              >
                Birth year:
              </label>
              <input
                type="number"
                id="birthYear"
                name="birthYear"
                className="bg-transparent text-lg outline-none flex-1"
              />
            </div>
          </div>

          {/* TODO: make button actionable */}
          <div className="flex items-center justify-center mt-10">
            <button
              className="uppercase bg-green-600 text-white font-semibold p-2 rounded-xl hover:opacity-85 duration-100"
              title="Create applicant form"
            >
              create
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default ApplicantForm;
