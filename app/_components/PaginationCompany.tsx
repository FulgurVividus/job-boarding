"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
const Spinner = dynamic(() => import("./Spinner"));

interface PaginationCompanyProps {
  hasNextPage: boolean | undefined;
  hasPrevPage: boolean | undefined;
  companyAllVacanciesLength: number;
}

const PaginationCompany: React.FC<PaginationCompanyProps> = ({
  hasNextPage,
  hasPrevPage,
  companyAllVacanciesLength,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const page: string = searchParams?.get("page") ?? "1";
  const per_page: string = searchParams?.get("per_page") ?? "8";

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex items-center justify-center gap-4 p-4 mt-5">
          {/* Previous button */}
          <button
            disabled={!hasPrevPage}
            title="Previous page"
            type="button"
            onClick={() => {
              router.push(
                `${pathname}?page=${Number(page) - 1}&per_page=${per_page}`
              );
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
              }, 1000);
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              hasPrevPage
                ? "bg-mainSalmon text-white hover:bg-opacity-90"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            <ChevronLeft size={16} />
          </button>

          <div className="text-sm font-bold text-gray-700">
            {page} / {Math.ceil(companyAllVacanciesLength / Number(per_page))}
          </div>

          {/* Next button */}
          <button
            disabled={!hasNextPage}
            title="Next page"
            type="button"
            onClick={() => {
              router.push(
                `${pathname}?page=${Number(page) + 1}&per_page=${per_page}`
              );
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
              }, 1000);
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              hasNextPage
                ? "bg-mainSalmon text-white hover:bg-opacity-90"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </>
  );
};

export default PaginationCompany;
