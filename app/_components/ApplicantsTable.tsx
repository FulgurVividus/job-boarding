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
  RefreshCcw,
  Search,
  User,
} from "lucide-react";
import React, { useState } from "react";
import {
  acceptApplicantAction,
  rejectApplicantAction,
} from "@/app/_lib/actions";
import toast from "react-hot-toast";

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
  status?: string;
  actions?: () => void;
  vacancy_id?: number;
}

const ApplicantsTable: React.FC<ApplicantsTableProps> = ({
  allAppliedApplicants,
}) => {
  const columnHelper = createColumnHelper<Applicants>();

  const applicants: Applicants[] =
    allAppliedApplicants?.map((applicant) => ({
      ...applicant.applicants,
      status: applicant.status,
      vacancy_id: applicant.vacancy_id,
    })) ?? [];

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

    // status
    columnHelper.accessor("status", {
      id: "status",
      cell: (info) => {
        const status = info.getValue() as string;

        const statusClasses: Record<string, string> = {
          rejected: "bg-red-100 text-red-700",
          accepted: "bg-green-100 text-green-700",
          applied: "bg-yellow-100 text-yellow-700",
        };

        return (
          <span
            className={`px-2 py-1 font-medium rounded ${
              statusClasses[status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {status}
          </span>
        );
      },
      header: () => (
        <span className="flex items-center">
          <RefreshCcw className="mr-2 flex-shrink-0" size={16} /> Status
        </span>
      ),
    }),

    // actions
    columnHelper.accessor("actions", {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              handleAcceptApplicant(
                e,
                row.original.id,
                row.original.vacancy_id as number
              );
              handleApplicantRefresh();
            }}
            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            type="button"
          >
            Accept
          </button>

          <button
            onClick={(e) => {
              handleRejectApplicant(
                e,
                row.original.id,
                row.original.vacancy_id as number
              );
              handleApplicantRefresh();
            }}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            type="button"
          >
            Reject
          </button>
        </div>
      ),
    }),
  ];

  const [data] = useState(applicants);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  async function handleRejectApplicant(
    e: React.MouseEvent<HTMLButtonElement>,
    applicant_id: number,
    vacancy_id: number
  ) {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("applicant_id", applicant_id.toString());
      form.append("vacancy_id", vacancy_id.toString());

      await rejectApplicantAction(form);

      toast.success(`Applicant was rejected`);
    } catch (error) {
      const errorHappen = error as Error;
      console.log(errorHappen.message);
      toast.error(errorHappen.message);
    }
  }

  async function handleAcceptApplicant(
    e: React.MouseEvent<HTMLButtonElement>,
    applicant_id: number,
    vacancy_id: number
  ) {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("applicant_id", applicant_id.toString());
      form.append("vacancy_id", vacancy_id.toString());

      await acceptApplicantAction(form);

      toast.success(`Applicant was accepted`);
    } catch (error) {
      const errorHappen = error as Error;
      console.log(errorHappen.message);
      toast.error(errorHappen.message);
    }
  }

  function handleApplicantRefresh() {
    location.reload();
  }

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

      {allAppliedApplicants && allAppliedApplicants?.length > 0 ? (
        <form>
          {allAppliedApplicants.map((appliedApplicant) => (
            <div key={appliedApplicant.id}>
              <input
                type="hidden"
                value={appliedApplicant?.applicants?.id}
                name="applicant_id"
              />
              <input
                type="hidden"
                value={appliedApplicant?.vacancy_id}
                name="vacancy_id"
              />
            </div>
          ))}

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
                  type="button"
                >
                  <ChevronsLeft size={20} />
                </button>

                {/* Go to previous page */}
                <button
                  className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  title="Go to previous page"
                  type="button"
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
                  type="button"
                >
                  <ChevronsRight size={20} />
                </button>

                {/* Go to last page */}
                <button
                  className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                  title="Go to last page"
                  type="button"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <h3 className="text-center text-xl md:text-2xl lg:text-3xl font-semibold text-gray-600 bg-gray-100 p-6 rounded-lg shadow-md mt-4">
          No one has applied for this vacancy
        </h3>
      )}
    </main>
  );
};

export default ApplicantsTable;
