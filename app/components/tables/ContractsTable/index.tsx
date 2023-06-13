import React from "react";
import { Button, Table } from "flowbite-react";
import { HiTrash, HiOutlinePencilAlt } from "react-icons/hi";
import type { Contract } from "~/models/contracts.sever";
import { Link } from "@remix-run/react";

interface ContractsTableType {
  currentPage: number;
  contracts: Contract[];
}

const ContractsTable: React.FC<ContractsTableType> = ({
  currentPage,
  contracts,
}) => {
  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>#</Table.HeadCell>
        <Table.HeadCell>Contract</Table.HeadCell>
        <Table.HeadCell>OA</Table.HeadCell>
        <Table.HeadCell>Serie</Table.HeadCell>
        <Table.HeadCell>OS Balance</Table.HeadCell>
        <Table.HeadCell>Tel</Table.HeadCell>
        <Table.HeadCell>Action</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {contracts?.map((contract: Contract) => {
          const {
            id,
            contract_no,
            os_balance,
            debt_series: { name: debt_series_name },
            oas: { name: oa_name },
            customers: { first_name, last_name, tel_no },
          } = contract;
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
                  {contract_no}
                </p>
              </Table.Cell>
              <Table.Cell className="text-base text-gray-900 dark:text-white">
                {oa_name}
              </Table.Cell>
              <Table.Cell className="text-base text-gray-900 dark:text-white">
                {debt_series_name}
              </Table.Cell>
              <Table.Cell className="text-base text-gray-900 dark:text-white">
                {os_balance}
              </Table.Cell>
              <Table.Cell className="text-base text-gray-900 dark:text-white">
                {tel_no}
              </Table.Cell>
              <Table.Cell className="text-base text-gray-900 dark:text-white">
                <div className="flex items-center space-x-4">
                  <Link
                    // to={`?page=${currentPage}&contract=${contract_no}&modal-type=edit`}
                    to={`#`}
                  >
                    <Button color="info">
                      <div className="flex items-center gap-x-2">
                        <HiOutlinePencilAlt className="text-lg" />
                        Edit
                      </div>
                    </Button>
                  </Link>
                  <Link
                    to={`?page=${currentPage}&contract=${contract_no}&modal-type=delete`}
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

export default ContractsTable;
