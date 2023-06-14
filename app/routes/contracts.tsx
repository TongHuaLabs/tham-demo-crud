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
  createContract,
  deleteContract,
  getContractListItems,
  getOptionListItems,
  getContractByContractNo,
  searchContract,
  updateContract,
} from "~/models/contracts.sever";
import ContractsTable from "~/components/tables/ContractsTable";
import AddModal from "~/components/modals/AddModal";
import AddModalBody from "~/components/modal-body/contract/AddModalBody";
import UpdateItemModal from "~/components/modals/UpdateItemModal";
import UpdateModalBody from "~/components/modal-body/contract/UpdateModalBody";

const ITEMS_PER_PAGE = 10;

export async function loader({ request }: LoaderArgs) {
  const { searchParams } = new URL(request.url);
  const pageParams = Number(searchParams.get("page") || 0);
  const contractId = Number(searchParams.get("contractId"));
  const search = searchParams.get("search");
  const modal = searchParams.get("modal-type");
  const page = pageParams === 0 ? pageParams : pageParams - 1;
  const from = page * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  const { debt_series, oas, customers } = await getOptionListItems();
  const { data: contract } = await getContractByContractNo(contractId);

  // ?search
  if (search) {
    const {
      data: contracts,
      count,
      error,
    } = await searchContract({ search, from, to });
    if (error) {
      return new Response(`Could not load data`, { status: 500 });
    }
    return json({
      search,
      contract,
      contracts,
      debt_series,
      oas,
      customers,
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
    contract,
    contracts,
    debt_series,
    oas,
    customers,
    totalPage: Math.ceil(count / ITEMS_PER_PAGE),
    currentPage: page + 1,
    modal,
  });
}

export async function action({ request }: ActionArgs) {
  const { searchParams } = new URL(request.url);
  const modal = searchParams.get("modal-type");
  const contractId = Number(searchParams.get("contractId"));
  const formData = await request.formData();
  const {
    contract_no,
    os_balance,
    financial_institution,
    debt_serie_id,
    oa_id,
    customer_id,
  } = Object.fromEntries(formData);

  if (modal === "delete" && contractId) {
    await deleteContract(contractId);
    return redirect("#");
  }

  if (
    contract_no &&
    os_balance &&
    financial_institution &&
    debt_serie_id &&
    oa_id &&
    customer_id
  ) {
    if (modal === "add") {
      await createContract({
        contract_no: String(contract_no),
        financial_institution: String(financial_institution),
        os_balance: Number(os_balance),
        debt_serie_id: Number(debt_serie_id),
        oa_id: Number(oa_id),
        customer_id: Number(customer_id),
      });

      return redirect("#");
    }

    if (modal === "edit") {
      await updateContract({
        contractId,
        contract_no: String(contract_no),
        financial_institution: String(financial_institution),
        os_balance: Number(os_balance),
        debt_serie_id: Number(debt_serie_id),
        oa_id: Number(oa_id),
        customer_id: Number(customer_id),
      });

      return redirect("#");
    }
  }

  return null;
}

export default function ContractPage() {
  const {
    search,
    contract,
    contracts,
    totalPage,
    currentPage,
    modal,
    debt_series,
    oas,
    customers,
  } = useLoaderData<typeof loader>();

  const hasSearch = search && `search=${search}&`;

  return (
    <Layout isFooter={false}>
      <div className="space-y-4 bg-white p-4 shadow dark:bg-gray-800 sm:p-6">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          All Contracts
        </h2>
        <div className="flex items-center justify-between">
          <Search className="w-1/2" defaultValue={search} />
          <Link to="?modal-type=add">
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
      <AddModal
        title="Add new contract"
        visible={modal === "add"}
        body={
          <AddModalBody
            debt_series={debt_series}
            oas={oas}
            customers={customers}
          />
        }
      />
      <UpdateItemModal
        title="Edit contract"
        visible={modal === "edit"}
        body={
          <UpdateModalBody
            debt_series={debt_series}
            oas={oas}
            customers={customers}
            contract={contract}
          />
        }
      />
    </Layout>
  );
}
