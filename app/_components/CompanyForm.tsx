import React from "react";
import { createCompanyAction } from "@/app/_lib/actions";

interface CompanyFormProps {
  user:
    | {
        id: number;
        email: string;
        role: string;
        fullName: string;
      }
    | undefined;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ user }) => {
  return (
    <>
      <section className="flex flex-col justify-center items-center h-screen">
        <h1 className="font-semibold text-center mb-10 text-2xl md:text-4xl">
          You must create the{" "}
          <span className="text-mainSalmon font-extrabold">company</span> form
        </h1>

        <form
          action={createCompanyAction}
          className="mt-10 flex flex-col justify-between"
        >
          {/* inputs div */}
          <div className="flex flex-col gap-5 w-full max-w-lg">
            <div className="flex items-center gap-2">
              <label
                htmlFor="companyName"
                className="font-serif text-lg font-semibold"
              >
                Company name:
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                className="bg-transparent text-lg outline-none flex-1"
              />
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="location"
                className="font-serif text-lg font-semibold"
              >
                Location:
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="bg-transparent text-lg outline-none flex-1"
              />
            </div>

            <div className="flex items-center gap-3 md:gap-2">
              <label
                htmlFor="contactEmail"
                className="font-serif text-lg font-semibold"
              >
                Contact email:
              </label>
              <input
                type="text"
                id="contactEmail"
                name="contactEmail"
                defaultValue={user?.email}
                className="bg-transparent text-lg outline-none flex-1"
              />
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="contactNumber"
                className="font-serif text-lg font-semibold"
              >
                Contact number:
              </label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                className="bg-transparent text-lg outline-none flex-1"
              />
            </div>
          </div>

          <div className="flex items-center justify-center mt-10">
            <button
              className="uppercase bg-green-600 text-white font-semibold p-2 rounded-xl hover:opacity-85 duration-100"
              title="Create company form"
            >
              create
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default CompanyForm;
