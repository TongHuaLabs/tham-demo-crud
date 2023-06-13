import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Pagination from "~/components/Pagination";
import Layout from "~/layouts/MainLayout";
import Search from "~/components/Search";
import { HiPlus } from "react-icons/hi";
import DeleteModal from "~/components/modals/DeleteModal";
import { Button } from "flowbite-react";
import {
  deleteContract,
  getContractListItems,
  searchContract,
} from "~/models/contracts.sever";
import ContractsTable from "~/components/tables/ContractsTable";

const ITEMS_PER_PAGE = 10;

export async function loader({ request }: LoaderArgs) {
  const { searchParams } = new URL(request.url);
  const pageParams = Number(searchParams.get("page") || 0);
  const search = searchParams.get("search");
  const modal = searchParams.get("modal-type");

  // page 0: from 0 - to 9
  // page 1: from 10 - to 19
  // page 2: from 20 - to 29
  const page = pageParams === 0 ? pageParams : pageParams - 1;
  const from = page * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  // ?search
  if (search) {
    const {
      data: contracts,
      count,
      error,
    } = await searchContract({ search, from, to });
    console.log({ contracts });
    if (error) {
      return new Response(`Could not load data`, { status: 500 });
    }
    return json({
      search,
      contracts,
      totalPage: Math.ceil(count / ITEMS_PER_PAGE),
      currentPage: page + 1,
      modal,
    });
  }

  const {
    data: contracts,
    count,
    error,
  } = await getContractListItems({ from, to });

  if (error) {
    return new Response(`Could not load data`, { status: 500 });
  }

  return json({
    search: "",
    contracts,
    totalPage: Math.ceil(count / ITEMS_PER_PAGE),
    currentPage: page + 1,
    modal,
  });
}

export async function action({ request }: ActionArgs) {
  const { searchParams } = new URL(request.url);
  const modal = searchParams.get("modal-type");
  const contractNo = searchParams.get("contract");

  if (modal === "delete" && contractNo) {
    await deleteContract(contractNo);
    return redirect("#");
  }

  return null;
}

export default function ContractPage() {
  const { search, contracts, totalPage, currentPage, modal } =
    useLoaderData<typeof loader>();

  const hasSearch = search && `search=${search}&`;

  return (
    <Layout isFooter={false}>
      <div className="space-y-4 bg-white p-4 shadow dark:bg-gray-800 sm:p-6">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          All Contracts
        </h2>
        <div className="flex items-center justify-between">
          <Search className="w-1/2" defaultValue={search} />
          <Link to="#">
            <Button color="success">
              <div className="flex items-center gap-x-2">
                <HiPlus className="text-lg" />
                Add Contracts
              </div>
            </Button>
          </Link>
        </div>
        <div className="flex flex-col">
          <Pagination
            totalPage={totalPage}
            currentPage={currentPage}
            prevPage={`${
              currentPage <= 1
                ? `/contracts?${hasSearch}page=1`
                : `/contracts?${hasSearch}page=${currentPage - 1}`
            }`}
            nextPage={
              currentPage !== totalPage
                ? `/contracts?${hasSearch}page=${currentPage + 1}`
                : `/contracts?${hasSearch}page=${totalPage}`
            }
          />
          <ContractsTable contracts={contracts} currentPage={currentPage} />
        </div>
      </div>
      <DeleteModal visible={modal === "delete"} />
      {/* <AddModal
        title="Add new customer"
        visible={modal === "add"}
        body={<AddCustomerModalBody positions={positions} />}
      />
      <UpdateItemModal
        title="Add new customer"
        visible={modal === "edit"}
        body={
          <UpdateCustomerModalBody positions={positions} customer={customer} />
        }
      /> */}
    </Layout>
  );
}
