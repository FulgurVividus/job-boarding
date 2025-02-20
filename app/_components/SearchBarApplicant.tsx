"use client";

import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";

interface SearchProps {
  placeholder: string;
}

const SearchBarApplicant: React.FC<SearchProps> = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useCallback(
    useDebouncedCallback((term: string) => {
      const params = new URLSearchParams(searchParams);

      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }
      router.replace(`${pathname}?${params.toString()}`);
    }, 300),
    [searchParams, pathname, router]
  );

  return (
    <>
      <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md w-full max-w-xs lg:max-w-md order-2 md:order-none">
        <label htmlFor="search"></label>

        <input
          type="search"
          id="search"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams?.get("query")?.toString()}
          className="flex-grow bg-transparent text-sm md:text-base text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 px-1 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-mainBlue"
        />

        <MagnifyingGlassCircleIcon className="h-6 w-6 md:h-8 md:w-8" />
      </div>
    </>
  );
};

export default SearchBarApplicant;
