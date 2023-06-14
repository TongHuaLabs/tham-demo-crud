import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData, useLocation } from "@remix-run/react";
import Pagination from "~/components/Pagination";
import CustomersTable from "~/components/tables/CustomersTable";
import Layout from "~/layouts/MainLayout";
import {
  createCustomer,
  deleteCustomer,
  searchCustomer,
  getCustomerListItems,
  getPositionListItems,
  getCustomerById,
  updateCustomer,
} from "~/models/customers.sever";
import Search from "~/components/Search";
import { HiPlus } from "react-icons/hi";
import DeleteModal from "~/components/modals/DeleteModal";
import AddModal from "~/components/modals/AddModal";
import UpdateItemModal from "~/components/modals/UpdateItemModal";
import AddModalBody from "~/components/modal-body/customer/AddModalBody";
import UpdateModalBody from "~/components/modal-body/customer/UpdateModalBody";
import { Button } from "flowbite-react";

const ITEMS_PER_PAGE = 10;

export async function loader({ request }: LoaderArgs) {
  const { searchParams } = new URL(request.url);
  const pageParams = Number(searchParams.get("page") || 0);
  const customerId = Number(searchParams.get("customerId"));
  const search = searchParams.get("search");
  const modal = searchParams.get("modal-type");

  // page 0: from 0 - to 9
  // page 1: from 10 - to 19
  // page 2: from 20 - to 29
  const page = pageParams === 0 ? pageParams : pageParams - 1;
  const from = page * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  const { data: positions } = await getPositionListItems();
  const { data: customer } = await getCustomerById(customerId);

  // ?search
  if (search) {
    const {
      data: customers,
      count,
      error,
    } = await searchCustomer({ search, from, to });
    if (error) {
      return new Response(`Could not load data`, { status: 500 });
    }
    return json({
      search,
      customer,
      customers,
      positions,
      totalPage: Math.ceil(count / ITEMS_PER_PAGE),
      currentPage: page + 1,
      modal,
    });
  }

  const {
    data: customers,
    count,
    error,
  } = await getCustomerListItems({ from, to });

  if (error) {
    return new Response(`Could not load data`, { status: 500 });
  }

  return json({
    search: "",
    customer,
    customers,
    positions,
    totalPage: Math.ceil(count / ITEMS_PER_PAGE),
    currentPage: page + 1,
    modal,
  });
}

export async function action({ request }: ActionArgs) {
  const { searchParams } = new URL(request.url);
  const formData = await request.formData();
  const modal = searchParams.get("modal-type");
  const customerId = Number(searchParams.get("customerId"));
  const {
    first_name,
    last_name,
    national_id,
    position,
    salary,
    address_details,
    tel_no,
  } = Object.fromEntries(formData);

  if (modal === "delete" && customerId) {
    await deleteCustomer(customerId);
    return redirect("#");
  }

  if (
    first_name &&
    last_name &&
    national_id &&
    position &&
    salary &&
    address_details &&
    tel_no
  ) {
    if (modal === "add") {
      await createCustomer({
        first_name: String(first_name),
        last_name: String(last_name),
        national_id: Number(national_id),
        position: Number(position),
        salary: Number(salary),
        address_details: String(address_details),
        tel_no: String(tel_no),
      });

      return redirect("#");
    }

    if (modal === "edit") {
      await updateCustomer({
        customerId,
        first_name: String(first_name),
        last_name: String(last_name),
        national_id: Number(national_id),
        position: Number(position),
        salary: Number(salary),
        address_details: String(address_details),
        tel_no: String(tel_no),
      });

      return redirect("#");
    }
  }

  return null;
}

export default function CustomerPage() {
  const {
    search,
    customer,
    customers,
    positions,
    totalPage,
    currentPage,
    modal,
  } = useLoaderData<typeof loader>();
  const { search: locationSearch } = useLocation();

  const hasSearch = search && `search=${search}&`;

  return (
    <Layout isFooter={false}>
      <div className="space-y-4 bg-white p-4 shadow dark:bg-gray-800 sm:p-6">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          All Customers
        </h2>
        <div className="flex items-center justify-between">
          <Search className="w-1/2" defaultValue={search} />
          <Link
            to={
              locationSearch
                ? `${locationSearch}&modal-type=add`
                : `?modal-type=add`
            }
          >
            <Button color="success">
              <div className="flex items-center gap-x-2">
                <HiPlus className="text-lg" />
                Add Customer
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
                ? `/customers?${hasSearch}page=1`
                : `/customers?${hasSearch}page=${currentPage - 1}`
            }`}
            nextPage={
              currentPage !== totalPage
                ? `/customers?${hasSearch}page=${currentPage + 1}`
                : `/customers?${hasSearch}page=${totalPage}`
            }
          />
          <CustomersTable
            customers={customers}
            currentPage={currentPage}
            hasSearch={hasSearch}
          />
        </div>
      </div>
      <DeleteModal visible={modal === "delete"} />
      <AddModal
        title="Add new customer"
        visible={modal === "add"}
        body={<AddModalBody positions={positions} />}
      />
      <UpdateItemModal
        title="Edit customer"
        visible={modal === "edit"}
        body={<UpdateModalBody positions={positions} customer={customer} />}
      />
    </Layout>
  );
}
