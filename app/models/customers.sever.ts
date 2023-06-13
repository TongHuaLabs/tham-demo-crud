import { supabase } from "~/utils"

export interface Customer {
  id: number
  first_name: string
  last_name: string
  national_id: number
  province: string
  salary: number
  tel_no: string
  zip_code: number
  address_details: string
  city: string
  date_of_birth: string
  marital_status: {
    name: string
  }
  occupation_types: {
    name: string
  }
  business_types: {
    name: string
  }
  gender: {
    name: string
  }
  home_types: {
    name: string
  }
};

interface CreateCustomer extends Pick<Customer, "first_name" | "last_name" | "national_id" | "salary" | "tel_no" | "address_details"> {
  position: number
}

interface UpdateCustomer extends CreateCustomer {
  customerId: number
}

const query = `*, business_types(name), gender(name), 
  home_types(name), marital_status(name), occupation_types(name)`

export async function getCustomerListItems(params?: { to?: number, from?: number }) {
  const { from, to } = params || {}
  const { data, count, error } = await supabase.from("customers").select(query, { count: "exact" })
    .order('id', { ascending: true })
    .range(from || 0, to || 999999999)
  return { data, count: count || 0, error }
}

export async function getCustomerById(customerId: number) {
  const { data, error } = await supabase.from("customers").select(query).eq("id", customerId).single()
  return { data, error }
}

export async function searchCustomer(params?: { search: string, to?: number, from?: number }) {
  const { search, to, from } = params || {}
  const { data, count, error } = await supabase.from("customers")
    .select(query, { count: "exact" })
    .order('id', { ascending: true })
    .like("search_customers", `%${search}%`)
    .range(from || 0, to || 999999999)
  return { data, count: count || 0, error }
}

export async function deleteCustomer(customerId: number) {
  const { error } = await supabase
    .from("customers")
    .delete({ returning: "minimal" })
    .eq('id', customerId)

  if (!error) {
    return {};
  }

  return null;
}

export async function createCustomer({ first_name, last_name, national_id, salary, tel_no, address_details, position }: CreateCustomer) {
  const { data, error } = await supabase
    .from("customers")
    .insert([{ first_name, last_name, national_id, salary, tel_no, address_details, occupation_types_id: position }])
    .single();

  if (!error) {
    return data;
  }
  return null;
}

export async function updateCustomer({ customerId, first_name, last_name, national_id, salary, tel_no, address_details, position }: UpdateCustomer) {
  const { data, error } = await supabase
    .from("customers")
    .update({ first_name, last_name, national_id, salary, tel_no, address_details, occupation_types_id: position })
    .eq("id", customerId)
    .single()

  if (!error) {
    return data;
  }
  return null;
}

export async function getPositionListItems() {
  const { data, error } = await supabase.from("occupation_types")
    .select(`*`)
    .order('id', { ascending: true })
  return { data, error }
}

