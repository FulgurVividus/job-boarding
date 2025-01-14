// backend logic

import { supabaseServer } from "./supabase";

interface User {
  fullName: string;
  email: string;
  userId?: number;
  role?: string;
}

// get all vacancies
export async function getAllVacancies() {
  const { data: vacancies, error } = await supabaseServer
    .from("vacancies")
    .select("*");

  if (error) {
    console.log(`Error in getting all vacancies: ${error}`);
  }

  return vacancies;
}

// get specific vacancy
export async function getVacancy(id: number) {
  const { data: vacancy, error } = await supabaseServer
    .from("vacancies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(`Error in getting specific vacancy: ${error}`);
  }

  return vacancy;
}

// get all company's vacancies
export async function getCompanyAllVacancies(id: number) {
  const { data: vacancies, error } = await supabaseServer
    .from("vacancies")
    .select("*")
    .eq("company_id", id);

  if (error) {
    console.log(`Error in getting all company's vacancies: ${error}`);
  }

  return vacancies;
}

// get specific company's vacancy
export async function getCompanySpecificVacancy(id: number) {
  const { data: companyVacancy, error } = await supabaseServer
    .from("vacancies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(`Error in getting company's vacancy: ${error}`);
  }

  return companyVacancy;
}

// get specific company info
export async function getCompanyInfo(id: number) {
  const { data: companyInfo, error } = await supabaseServer
    .from("companies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(`Error in getting company's info: ${error}`);
  }

  return companyInfo;
}

// get the user (uniquely identified by email)
export async function getUser(email: string) {
  const { data: user } = await supabaseServer
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  return user;
}

// create a new user
export async function createUser(newUser: User) {
  const { data, error } = await supabaseServer.from("users").insert([newUser]);

  if (error) {
    console.log(`Error in creating user: ${error}`);
    throw new Error(`A new user cannot be created`);
  }

  return data;
}

// store user's role
export async function storeRole(role: string, userId: number) {
  const { data, error } = await supabaseServer
    .from("users")
    .update({ role: role })
    .eq("id", userId)
    .select();

  if (error) {
    console.log(`Error in storing user's role: ${error}`);
    throw new Error(`The role cannot be inserted`);
  }

  return data;
}

// get company user
export async function getCompanyUser(email: string) {
  const { data: companyUser, error } = await supabaseServer
    .from("companies")
    .select("*")
    .eq("contactEmail", email)
    .single();

  if (error) {
    console.log(`Error in getting company user: ${error}`);
  }

  return companyUser;
}

// get applicant user
export async function getApplicantUser(email: string) {
  const { data: applicantUser, error } = await supabaseServer
    .from("applicants")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    console.log(`Error in getting applicant user: ${error}`);
  }

  return applicantUser;
}
