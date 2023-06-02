import { supabase } from "./user.server";

export type Customer = {
  id?: number
  last_name?: string
  marital_status_id?: number
  national_id?: number
  occupation_types_id?: number
  province?: string
  salary?: number
  tel_no?: string
  zip_code?: number
  address_details?: string
  business_types_id?: number
  city?: string
  date_of_birth?: string
  first_name?: string
  gener_id?: number
  home_types_id?: number
};

export async function getCustomerListItems(params?: { to?: number, from?: number }) {
  const { from, to } = params || {}
  const { data } = await supabase.from("customers").select(`*, business_types(name), gender(name), 
  home_types(name), marital_status(name), occupation_types(name)`).range(from || 0, to || 999999999)
  return data;
}

// export async function createNote({
//   title,
//   body,
//   userId,
// }: Pick<Note, "body" | "title"> & { userId: User["id"] }) {
//   const { data, error } = await supabase
//     .from("notes")
//     .insert([{ title, body, profile_id: userId }])
//     .single();

//   if (!error) {
//     return data;
//   }

//   return null;
// }

// export async function deleteNote({
//   id,
//   userId,
// }: Pick<Note, "id"> & { userId: User["id"] }) {
//   const { error } = await supabase
//     .from("notes")
//     .delete({ returning: "minimal" })
//     .match({ id, profile_id: userId });

//   if (!error) {
//     return {};
//   }

//   return null;
// }

// export async function getNote({
//   id,
//   userId,
// }: Pick<Note, "id"> & { userId: User["id"] }) {
//   const { data, error } = await supabase
//     .from("notes")
//     .select("*")
//     .eq("profile_id", userId)
//     .eq("id", id)
//     .single();

//   if (!error) {
//     return {
//       userId: data.profile_id,
//       id: data.id,
//       title: data.title,
//       body: data.body,
//     };
//   }

//   return null;
// }
