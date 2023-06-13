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

const query = `*, debt_series(name), oas(name), customers(first_name, last_name, tel_no)`

export async function getContractListItems(params?: { to?: number, from?: number }) {
  const { from, to } = params || {}
  const { data, count, error } = await supabase.from("contracts").select(query, { count: "exact" })
    .order('id', { ascending: true })
    .range(from || 0, to || 999999999)
  return { data, count: count || 0, error }
}

export async function getContractByContractNo(contract_no: string) {
  const { data, error } = await supabase.from("contracts").select(query).eq("contract_no", contract_no).single()
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

export async function deleteContract(contract_no: string) {
  const { error } = await supabase
    .from("contracts")
    .delete({ returning: "minimal" })
    .eq('contract_no', contract_no)

  if (!error) {
    return {};
  }

  return null;
}

