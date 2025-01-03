"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabaseClient } from "./supabase";
import { redirect } from "next/navigation";
import { getCompanyAllVacancies, getCompanyUser, getUser } from "./services";

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

interface updateCompanyVacancyDataI {
  title: string;
  vacancyLocation: string;
  experienceRequired: string;
  salary: string;
  emailContact: string;
}

interface publishCompanyVacancyDataI {
  company_id: number;
  title: string;
  vacancyLocation: string;
  experienceRequired: string;
  salary: string;
  emailContact: string;
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

//# server action for updating a COMPANY vacancy
export async function updateCompanyVacancyAction(formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error(`You must be logged in`);
  }

  const id = Number(formData.get("id") as string);
  const title = formData.get("title")?.slice(0, 100) as string;
  const vacancyLocation = formData
    .get("vacancyLocation")
    ?.slice(0, 200) as string;
  const experienceRequired = formData
    .get("experienceRequired")
    ?.slice(0, 100) as string;
  const salary = formData.get("salary")?.slice(0, 100) as string;
  const emailContact = formData.get("emailContact")?.slice(0, 100) as string;

  const updateCompanyVacancyData: updateCompanyVacancyDataI = {
    title,
    vacancyLocation,
    experienceRequired,
    salary,
    emailContact,
  };

  const { data, error } = await supabaseClient
    .from("vacancies")
    .update(updateCompanyVacancyData)
    .eq("id", id);

  if (error) {
    console.log(`Cannot update the vacancy: ${error}`);
  }

  revalidatePath("/dashboard/company/vacancies", "layout");
  redirect("/dashboard/company/vacancies");
}

//# server action for deleting a COMPANY vacancy
export async function deleteCompanyVacancyAction(vacancyId: number) {
  const session = await auth();

  if (!session) {
    throw new Error(`You must be logged in`);
  }

  const user = await getUser(session?.user?.email || "");
  const companyUser = await getCompanyUser(user?.email);

  const companyAllVacancies = await getCompanyAllVacancies(companyUser?.id);
  const companyAllVacanciesIds: number[] | undefined = companyAllVacancies?.map(
    (vacancy) => vacancy.id
  );

  if (!companyAllVacanciesIds?.includes(vacancyId)) {
    throw new Error(`You are not allowed to delete this vacancy`);
  }

  const { error } = await supabaseClient
    .from("vacancies")
    .delete()
    .eq("id", vacancyId);

  if (error) {
    throw new Error(`Vacancy could not be deleted: ${error}`);
  }

  revalidatePath("/dashboard/company/vacancies", "layout");
  redirect("/dashboard/company/vacancies");
}

//# server action for publishing a COMPANY vacancy
export async function publishCompanyVacancyAction(formData: FormData) {
  const session = auth();

  if (!session) {
    throw new Error(`You must be logged in`);
  }

  const company_id = Number(formData.get("company_id") as string);
  const title = formData.get("title")?.slice(0, 100) as string;
  const vacancyLocation = formData
    .get("vacancyLocation")
    ?.slice(0, 200) as string;
  const experienceRequired = formData
    .get("experienceRequired")
    ?.slice(0, 100) as string;
  const salary = formData.get("salary")?.slice(0, 100) as string;
  const emailContact = formData.get("emailContact")?.slice(0, 100) as string;

  const publishCompanyVacancyData: publishCompanyVacancyDataI = {
    company_id,
    title,
    vacancyLocation,
    experienceRequired,
    salary,
    emailContact,
  };

  const { error } = await supabaseClient
    .from("vacancies")
    .insert([publishCompanyVacancyData])
    .select()
    .single();

  if (error) {
    throw new Error(`Vacancy could not be published: ${error}`);
  }

  revalidatePath("/dashboard/company/vacancies", "layout");
  redirect("/dashboard/company/vacancies");
}
