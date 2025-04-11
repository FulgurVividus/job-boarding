"use client";

import { supabaseClient } from "@/app/_lib/supabase";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface UpdateCompanyVacancyDataI {
  title: string;
  vacancyLocation: string;
  experienceRequired: string;
  salary: string;
  emailContact: string;
}

const SuccessUpdate = () => {
  const searchParams = useSearchParams();
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(
    function () {
      const insertVacancy = async () => {
        const id = Number(searchParams.get("id") as string);
        const title = searchParams.get("title")?.slice(0, 100) as string;
        const vacancyLocation = searchParams
          .get("vacancyLocation")
          ?.slice(0, 200) as string;
        const experienceRequired = searchParams
          .get("experienceRequired")
          ?.slice(0, 100) as string;
        const salary = searchParams.get("salary")?.slice(0, 100) as string;
        const emailContact = searchParams
          .get("emailContact")
          ?.slice(0, 100) as string;

        const updateCompanyVacancyData: UpdateCompanyVacancyDataI = {
          title,
          vacancyLocation,
          experienceRequired,
          salary,
          emailContact,
        };

        const { error } = await supabaseClient
          .from("vacancies")
          .update(updateCompanyVacancyData)
          .eq("id", id);

        if (error) {
          setIsError(true);
          toast.error("Vacancy could not be updated");
          throw new Error(`Cannot update the vacancy: ${error}`);
        } else {
          toast.success(`${title} vacancy is updated`);
        }
      };

      insertVacancy();
    },
    [searchParams]
  );

  return (
    <>
      {!isError ? (
        <div className="container mx-auto px-4 py-8 text-center flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="mb-4">
            Thank you for updating your vacancy. Your payment is being processed
            and your vacancy is updated.
          </p>

          <Link
            href={"/dashboard/company/vacancies"}
            className="text-blue-600 hover:underline"
          >
            Home
          </Link>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8 text-center flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold mb-4">Error!</h1>
          <p className="mb-4">
            Something went wrong, you cannot now update a vacancy.
          </p>

          <Link
            href={"/dashboard/company/vacancies"}
            className="text-blue-600 hover:underline"
          >
            Home
          </Link>
        </div>
      )}
    </>
  );
};

export default SuccessUpdate;
