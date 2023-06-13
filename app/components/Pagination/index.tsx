import React from "react";
import { Link } from "@remix-run/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface PaginationType {
  currentPage: number;
  totalPage: number;
  prevPage: string;
  nextPage: string;
}

const Pagination: React.FC<PaginationType> = ({
  currentPage,
  totalPage,
  prevPage,
  nextPage,
}) => {
  return (
    <div className="flex items-center justify-end bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <Link
        to={prevPage || "/"}
        className={`${
          currentPage === 1
            ? "cursor-not-allowed"
            : "cursor-pointer hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
        } inline-flex justify-center rounded p-1 text-gray-500 dark:text-gray-400`}
      >
        <span className="sr-only">Previous page</span>
        <ChevronLeftIcon className="h-6 w-6" />
      </Link>
      <Link
        to={nextPage || "/"}
        className={`${
          currentPage === totalPage
            ? "cursor-not-allowed"
            : "cursor-pointer hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
        } mr-2 inline-flex justify-center rounded p-1 text-gray-500 dark:text-gray-400`}
      >
        <span className="sr-only">Next page</span>
        <ChevronRightIcon className="h-6 w-6" />
      </Link>
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Page&nbsp;
        <span className="font-semibold text-gray-900 dark:text-white">
          {currentPage}
        </span>
        &nbsp;of&nbsp;
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalPage}
        </span>
      </span>
    </div>
  );
};

export default Pagination;
