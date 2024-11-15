// backend logic

import { supabase } from "./supabase";

// get all vacancies
export async function getAllVacancies() {
  const { data: vacancies, error } = await supabase
    .from("vacancies")
    .select("*");

  if (error) {
    console.log(error);
  }

  return vacancies;
}

// get specific vacancy
export async function getVacancy(id: number) {
  const { data: vacancy, error } = await supabase
    .from("vacancies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
  }

  return vacancy;
}
