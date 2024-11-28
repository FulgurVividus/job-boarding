import React from "react";
import {
  BriefcaseIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  AtSymbolIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";

const AddCompanyVacancy: React.FC = () => {
  return (
    <form action="" className="mt-10 flex flex-col justify-between">
      {/* inputs div */}
      <div className="flex flex-col gap-5 w-full max-w-lg">
        <div className="flex items-center gap-2">
          <BriefcaseIcon className="h-5 w-5 flex-shrink-0" />
          <label htmlFor="title" className="font-serif text-lg font-semibold">
            Tittle:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="E.g: Software Engineer"
            className="bg-transparent text-lg outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <MapPinIcon className="h-5 w-5 flex-shrink-0" />
          <label
            htmlFor="vacancyLocation"
            className="font-serif text-lg font-semibold"
          >
            Location:
          </label>
          <input
            type="text"
            id="vacancyLocation"
            name="vacancyLocation"
            placeholder="E.g: London"
            className="bg-transparent text-lg outline-none"
          />
        </div>

        <div className="flex items-center gap-3 md:gap-2">
          <AcademicCapIcon className="h-5 w-5 flex-shrink-0" />
          <label
            htmlFor="experienceRequired"
            className="font-serif text-lg font-semibold"
          >
            Years of experience:
          </label>
          <input
            type="number"
            id="experienceRequired"
            name="experienceRequired"
            placeholder="E.g: 2"
            className="bg-transparent text-lg outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <CurrencyDollarIcon className="h-5 w-5 flex-shrink-0" />
          <label htmlFor="salary" className="font-serif text-lg font-semibold">
            Salary:
          </label>
          <input
            type="text"
            id="salary"
            name="salary"
            placeholder="E.g: 100.000$"
            className="bg-transparent text-lg outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <AtSymbolIcon className="h-5 w-5 flex-shrink-0" />
          <label
            htmlFor="emailContact"
            className="font-serif text-lg font-semibold"
          >
            Email:
          </label>
          <input
            type="text"
            id="emailContact"
            name="emailContact"
            placeholder="E.g: company@gmail.com"
            className="bg-transparent text-lg outline-none"
          />
        </div>
      </div>

      {/* TODO: make button actionable */}
      <div className="flex items-center justify-end mt-10">
        <button className="uppercase bg-green-600 text-white font-semibold py-2 px-4 rounded-xl hover:opacity-85 duration-100">
          add
        </button>
      </div>
    </form>
  );
};

export default AddCompanyVacancy;
