"use client";

import defaultImg from "@/public/default-vacancy-img.jpg";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface AllVacanciesProps {
  paginatedAllVacancies: {
    id: number;
    created_at: string;
    title: string;
    vacancyLocation: string;
    experienceRequired: number;
    salary: string;
    emailContact: string;
  }[];

  query?: string;
}

const ApplicantVacancyItem: React.FC<AllVacanciesProps> = ({
  paginatedAllVacancies,
  query,
}) => {
  const filteredAllVacancies = paginatedAllVacancies.filter((vacancy) =>
    vacancy.title.toLowerCase().includes(query?.toLowerCase() || "")
  );

  return (
    <>
      {!filteredAllVacancies.length && !query ? (
        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10 flex-wrap">
          {paginatedAllVacancies.map((vacancy) => (
            <ul key={vacancy.id}>
              <Link href={`/dashboard/applicant/vacancies/${vacancy.id}`}>
                <li className="hover:scale-105 transition-all duration-400 ease-in-out">
                  <Card className="py-3 md:py-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                      <p className="text-tiny uppercase font-semibold">
                        {vacancy.vacancyLocation}
                      </p>
                      <h4 className="font-bold text-large">{vacancy.title}</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                      <Image
                        alt="Card image"
                        className="object-cover rounded-xl select-none"
                        priority={true}
                        placeholder="blur"
                        src={defaultImg}
                        width={270}
                      />
                    </CardBody>
                  </Card>
                </li>
              </Link>
            </ul>
          ))}
        </div>
      ) : null}

      {filteredAllVacancies.length > 0 && (
        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10 flex-wrap">
          {filteredAllVacancies.map((vacancy) => (
            <ul key={vacancy.id}>
              <Link href={`/dashboard/applicant/vacancies/${vacancy.id}`}>
                <li className="hover:scale-105 transition-all duration-400 ease-in-out">
                  <Card className="py-3 md:py-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                      <p className="text-tiny uppercase font-semibold">
                        {vacancy.vacancyLocation}
                      </p>
                      <h4 className="font-bold text-large">{vacancy.title}</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                      <Image
                        alt="Card image"
                        className="object-cover rounded-xl select-none"
                        priority={true}
                        placeholder="blur"
                        src={defaultImg}
                        width={270}
                      />
                    </CardBody>
                  </Card>
                </li>
              </Link>
            </ul>
          ))}
        </div>
      )}

      {/* No vacancies message */}
      {!paginatedAllVacancies.length && !query ? (
        <div className="flex flex-col items-center justify-center mt-14 text-center px-4">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            <span className="text-mainSalmon font-medium">No</span> vacancies
            published yet
          </h1>
        </div>
      ) : null}

      {/* No results found message */}
      {filteredAllVacancies.length === 0 && query ? (
        <div className="flex flex-col items-center justify-center mt-14 text-center px-4">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            No results found :(
          </h1>
        </div>
      ) : null}
    </>
  );
};

export default ApplicantVacancyItem;
