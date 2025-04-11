"use client";

import defaultImg from "@/public/default-vacancy-img.jpg";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

interface CompanyAllVacanciesProps {
  paginatedCompanyAllVacancies: {
    id: number;
    created_at: string;
    company_id: number;
    title: string;
    vacancyLocation: string;
    experienceRequired: number;
    salary: string;
    emailContact: string;
  }[];
}

const CompanyVacancyItem: React.FC<CompanyAllVacanciesProps> = ({
  paginatedCompanyAllVacancies = [],
}) => {
  const searchParams = useSearchParams();
  const query: string = searchParams.get("query")?.toString() || "";

  const filteredCompanyAllVacancies = paginatedCompanyAllVacancies.filter(
    (vacancy) =>
      vacancy.title.toLowerCase().includes(query?.toLowerCase() || "")
  );

  return (
    <>
      {!filteredCompanyAllVacancies.length && !query ? (
        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10 flex-wrap">
          {paginatedCompanyAllVacancies.map((vacancy) => (
            <ul key={vacancy.id}>
              <Link href={`/dashboard/company/vacancies/${vacancy.id}`}>
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

      {filteredCompanyAllVacancies.length > 0 && (
        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10 flex-wrap">
          {filteredCompanyAllVacancies.map((vacancy) => (
            <ul key={vacancy.id}>
              <Link href={`/dashboard/company/vacancies/${vacancy.id}`}>
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

      {/* No vacancies published message */}
      {!paginatedCompanyAllVacancies.length && !query ? (
        <div className="flex flex-col items-center justify-center mt-14 text-center px-4">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            You have no vacancies yet
          </h1>

          <h2 className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Start creating them{" "}
            <span className="text-mainSalmon font-medium">today!</span>
          </h2>
        </div>
      ) : null}

      {/* No results found message */}
      {filteredCompanyAllVacancies.length === 0 && query ? (
        <div className="flex flex-col items-center justify-center mt-14 text-center px-4">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            No results found :(
          </h1>
        </div>
      ) : null}
    </>
  );
};

export default CompanyVacancyItem;
