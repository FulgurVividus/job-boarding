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

// get all company's vacancies
export async function getCompanyAllVacancies(companyId: number) {
  const { data: vacancies, error } = await supabase
    .from("vacancies")
    .select("*")
    .eq("company_id", companyId);

  if (error) {
    console.log(error);
  }

  return vacancies;
}

// get specific company's vacancy
export async function getCompanySpecificVacancy(id: number) {
  const { data: companyVacancy, error } = await supabase
    .from("vacancies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
  }

  return companyVacancy;
}

// get specific company info
export async function getCompanyInfo(id: number) {
  const { data: companyInfo, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
  }

  return companyInfo;
}
