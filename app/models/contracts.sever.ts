import { supabase } from "~/utils"

export interface Contract {
  id: number
  contract_no: string
  os_balance: number
  debt_series: {
    name: string
  }
  oas: {
    name: string;
  }
  customers: {
    first_name: string;
    last_name: string;
    tel_no: string;
  }
};

interface CreateContract extends Pick<Contract, "contract_no" | "os_balance"> {
  financial_institution: string;
  debt_serie_id: number;
  oa_id: number;
  customer_id: number;
}

interface UpdateContract extends CreateContract {
  contractId: number
}

const query = `*, debt_series(name), oas(name), customers(first_name, last_name, tel_no)`

export async function getContractListItems(params?: { to?: number, from?: number }) {
  const { from, to } = params || {}
  const { data, count, error } = await supabase.from("contracts").select(query, { count: "exact" })
    .order('id', { ascending: true })
    .range(from || 0, to || 999999999)
  return { data, count: count || 0, error }
}

export async function getContractByContractNo(contractId: number) {
  const { data, error } = await supabase.from("contracts").select(query).eq("id", contractId).single()
  return { data, error }
}

export async function searchContract(params?: { search: string, to?: number, from?: number }) {
  const { search, to, from } = params || {}
  const { data, count, error } = await supabase.from("contracts")
    .select(query, { count: "exact" })
    .order('id', { ascending: true })
    .like("contract_no", `%${search}%`)
    .range(from || 0, to || 999999999)
  return { data, count: count || 0, error }
}

export async function deleteContract(contractId: number) {
  const { error } = await supabase
    .from("contracts")
    .delete({ returning: "minimal" })
    .eq('id', contractId)

  if (!error) {
    return {};
  }

  return null;
}

export async function createContract({ contract_no, os_balance, financial_institution, debt_serie_id, oa_id, customer_id }: CreateContract) {
  const { data, error } = await supabase
    .from("contracts")
    .insert([{ contract_no, os_balance, financial_institution, debt_serie_id, oa_id, customer_id }])
    .single();

  if (!error) {
    return data;
  }
  return null;
}

export async function updateContract({ contractId, contract_no, os_balance, financial_institution, debt_serie_id, oa_id, customer_id }: UpdateContract) {
  const { data, error } = await supabase
    .from("contracts")
    .update({ contract_no, os_balance, financial_institution, debt_serie_id, oa_id, customer_id })
    .eq("id", contractId)
    .single()

  if (!error) {
    return data;
  }
  return null;
}

export async function getOptionListItems() {
  const { data: debt_series } = await supabase.from("debt_series").select(`*`).order('id', { ascending: true });
  const { data: oas } = await supabase.from("oas").select(`*`).order('id', { ascending: true });
  const { data: customers } = await supabase.from("customers").select(`*`).order('id', { ascending: true })
  return { debt_series, oas, customers }
}