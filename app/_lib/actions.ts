"use server";

import { auth, signIn, signOut } from "./auth";
import { supabaseClient } from "./supabase";
import { redirect } from "next/navigation";

interface createCompanyFormDataI {
  companyName: string;
  location: string;
  contactEmail: string;
  contactNumber: string;
  user_id: number;
}

interface createApplicantFormDataI {
  fullName: string;
  email: string;
  yearsOfExperience: number;
  birthYear: number;
  user_id: number;
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/role" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

//# server action for creating a COMPANY form
export async function createCompanyAction(formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error(`You must be logged in`);
  }

  const companyName = formData.get("companyName")?.slice(0, 100) as string;
  const location = formData.get("location")?.slice(0, 200) as string;
  const contactEmail = formData.get("contactEmail")?.slice(0, 100) as string;
  const contactNumber = formData.get("contactNumber")?.slice(0, 90) as string;
  const user_id = session?.user?.userId as number;

  if (!/^\+?\d{3,20}$/.test(contactNumber)) {
    throw new Error(`Invalid contact number`);
  }

  const createCompanyFormData: createCompanyFormDataI = {
    companyName,
    location,
    contactEmail,
    contactNumber,
    user_id,
  };

  const { data, error } = await supabaseClient
    .from("companies")
    .insert([createCompanyFormData])
    .select()
    .single();

  if (error) {
    console.log(`Cannot create the company form: ${error}`);
  }

  redirect("/dashboard/company/vacancies");
}

//# server action for creating an APPLICANT form
export async function createApplicantAction(formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error(`You must be logged in`);
  }

  const fullName = formData.get("fullName")?.slice(0, 100) as string;
  const email = formData.get("email")?.slice(0, 100) as string;
  const yearsOfExperience = Number(
    formData.get("yearsOfExperience")?.slice(0, 90) as string
  );
  const birthYear = Number(formData.get("birthYear")?.slice(0, 90) as string);
  const user_id = session?.user?.userId as number;

  const createApplicantFormData: createApplicantFormDataI = {
    fullName,
    email,
    yearsOfExperience,
    birthYear,
    user_id,
  };

  const { data, error } = await supabaseClient
    .from("applicants")
    .insert([createApplicantFormData])
    .select()
    .single();

  if (error) {
    console.log(`Cannot create the applicant form: ${error}`);
  }

  redirect("/dashboard/applicant/vacancies");
}
