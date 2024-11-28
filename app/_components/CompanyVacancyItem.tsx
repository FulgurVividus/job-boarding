"use client";

import defaultImg from "@/public/default-vacancy-img.jpg";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CompanyAllVacanciesProps {
  companyAllVacancies: {
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
  companyAllVacancies = [],
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10">
        {companyAllVacancies.map((vacancy) => (
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
    </>
  );
};

export default CompanyVacancyItem;
