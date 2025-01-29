"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  BriefcaseBusiness,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Mail,
  Search,
  User,
} from "lucide-react";
import React, { useState } from "react";

interface ApplicantsTableProps {
  allAppliedApplicants:
    | {
        id: number;
        created_at: string;
        vacancy_id: number;
        status: string;
        applicants: {
          id: number;
          email: string;
          user_id: number;
          fullName: string;
          birthYear: number;
          created_at: string;
          yearsOfExperience: string;
        };
      }[]
    | null;
}

interface Applicants {
  id: number;
  email: string;
  user_id: number;
  fullName: string;
  birthYear: number;
  created_at: string;
  yearsOfExperience: string;
}

const ApplicantsTable: React.FC<ApplicantsTableProps> = ({
  allAppliedApplicants,
}) => {
  const columnHelper = createColumnHelper<Applicants>();

  const applicants: Applicants[] =
    allAppliedApplicants?.map((applicant) => applicant.applicants) ?? [];

  const columns = [
    // id
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex items-center">
          <User className="mr-2" size={16} /> ID
        </span>
      ),
    }),

    // fullName
    columnHelper.accessor("fullName", {
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex items-center">
          <User className="mr-2" size={16} /> Full name
        </span>
      ),
    }),

    // email
    columnHelper.accessor("email", {
      id: "email",
      cell: (info) => (
        <span className="italic text-blue-600">{info.getValue()}</span>
      ),
      header: () => (
        <span className="flex items-center">
          <Mail className="mr-2" size={16} /> Email
        </span>
      ),
    }),

    // birthYear
    columnHelper.accessor("birthYear", {
      id: "birthYear",
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex items-center">
          <Calendar className="mr-2 flex-shrink-0" size={16} /> Birth year
        </span>
      ),
    }),

    //  yearsOfExperience
    columnHelper.accessor("yearsOfExperience", {
      id: "yearsOfExperience",
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex items-center">
          <BriefcaseBusiness className="mr-2 flex-shrink-0" size={16} /> Years
          of experience
        </span>
      ),
    }),
  ];

  const [data] = useState([...applicants]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const table = useReactTable({
    data,
    columns,

    state: { sorting, globalFilter },

    initialState: {
      pagination: {
        pageSize: 5,
        pageIndex: 0,
      },
    },

    getCoreRowModel: getCoreRowModel(),

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <main className="mt-10">
      <h2 className="text-center mt-10 text-2xl md:text-4xl font-extrabold tracking-tight">
        Applicants&apos; Table
      </h2>

      {allAppliedApplicants && allAppliedApplicants.length > 0 ? (
        <div className="flex flex-col max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Search bar */}
          <div className="mb-4 relative">
            <input
              type="text"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search for applicants..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          <div className="overflow-x-auto bg-white shadow-md rounded-lg w-full max-w-full">
            {/* Table */}
            <table className="min-w-max w-full divide-y divide-gray-200">
              {/* Table header */}
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup, index) => (
                  <tr key={index}>
                    {headerGroup.headers.map((header, index) => (
                      <th
                        key={index}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none flex items-center"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <ArrowUpDown className="ml-2" size={14} />
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              {/* Table body */}
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell, index) => (
                      <td
                        key={index}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700">
            <div className="flex items-center mb-4 sm:mb-0">
              <span className="mr-2">Applicants per page:</span>
              <select
                className="border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
              >
                {[5, 10, 15].map((pageSize, index) => (
                  <option key={index}>{pageSize}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              {/* Go to 1st page */}
              <button
                className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                title="Go to 1st page"
              >
                <ChevronsLeft size={20} />
              </button>

              {/* Go to previous page */}
              <button
                className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                title="Go to previous page"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Current page input */}
              <span className="flex items-center">
                <input
                  type="number"
                  min={1}
                  max={table.getPageCount()}
                  value={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                    const page: number = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    table.setPageIndex(page);
                  }}
                  className="w-16 p-2 rounded-md border border-gray-300 text-center"
                />
                <span className="ml-1">of {table.getPageCount()}</span>
              </span>

              {/* Go to next page */}
              <button
                className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                title="Go to next page"
              >
                <ChevronsRight size={20} />
              </button>

              {/* Go to last page */}
              <button
                className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                title="Go to last page"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h3 className="text-center text-xl md:text-2xl lg:text-3xl font-semibold text-gray-600 bg-gray-100 p-6 rounded-lg shadow-md mt-4">
          No one has applied for this vacancy
        </h3>
      )}
    </main>
  );
};

export default ApplicantsTable;
