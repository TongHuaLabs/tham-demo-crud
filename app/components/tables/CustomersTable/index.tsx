import React from "react";
import { Button, Table } from "flowbite-react";
import { HiTrash, HiOutlinePencilAlt } from "react-icons/hi";
import type { Customer } from "~/models/customers.sever";
import { Link } from "@remix-run/react";

interface CustomersTableType {
  currentPage: number;
  hasSearch: string;
  customers: Customer[];
}

const CustomersTable: React.FC<CustomersTableType> = ({
  currentPage,
  hasSearch,
  customers,
}) => {
  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>#</Table.HeadCell>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Position</Table.HeadCell>
        <Table.HeadCell>Salary</Table.HeadCell>
        <Table.HeadCell>Address</Table.HeadCell>
        <Table.HeadCell>Tel</Table.HeadCell>
        <Table.HeadCell>Action</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {customers?.map((customer: Customer) => {
          const {
            id,
            first_name,
            last_name,
            national_id,
            occupation_types,
            salary,
            address_details,
            tel_no,
          } = customer;
          return (
            <Table.Row
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
              key={id}
            >
              <Table.Cell className="text-base font-semibold text-gray-900 dark:text-white">
                {id}
              </Table.Cell>
              <Table.Cell className="flex flex-col">
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  {first_name} {last_name}
                </p>
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {national_id}
                </p>
              </Table.Cell>
              <Table.Cell className="text-base text-gray-900 dark:text-white">
                {occupation_types?.name}
              </Table.Cell>
              <Table.Cell className="text-base text-gray-900 dark:text-white">
                {salary}
              </Table.Cell>
              <Table.Cell className="text-base text-gray-900 dark:text-white">
                {address_details}
              </Table.Cell>
              <Table.Cell className="text-base text-gray-900 dark:text-white">
                {tel_no}
              </Table.Cell>
              <Table.Cell className="text-base text-gray-900 dark:text-white">
                <div className="flex items-center space-x-4">
                  <Link
                    to={`?${hasSearch}page=${currentPage}&customerId=${id}&modal-type=edit`}
                  >
                    <Button color="info">
                      <div className="flex items-center gap-x-2">
                        <HiOutlinePencilAlt className="text-lg" />
                        Edit
                      </div>
                    </Button>
                  </Link>
                  <Link
                    to={`?${hasSearch}page=${currentPage}&customerId=${id}&modal-type=delete`}
                  >
                    <Button color="failure">
                      <div className="flex items-center gap-x-2">
                        <HiTrash className="text-lg" />
                        Delete
                      </div>
                    </Button>
                  </Link>
                </div>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default CustomersTable;
