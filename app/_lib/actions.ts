"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabaseClient } from "./supabase";
import { redirect } from "next/navigation";
import { getCompanyAllVacancies, getCompanyUser, getUser } from "./services";
import { stripe } from "./stripe";

interface CreateCompanyFormDataI {
  companyName: string;
  location: string;
  contactEmail: string;
  contactNumber: string;
  user_id: number;
}

interface CreateApplicantFormDataI {
  fullName: string;
  email: string;
  yearsOfExperience: string;
  specialization: string;
  birthYear: number;
  user_id: number;
}

interface ApplyForVacancyDataI {
  vacancy_id: number;
  applicant_id: number;
  status: string;
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

  if (!/^\+\s?\d{2,3}(?:\s?\d{2,4})+$/.test(contactNumber)) {
    throw new Error(`Invalid contact number`);
  }

  const createCompanyFormData: CreateCompanyFormDataI = {
    companyName,
    location,
    contactEmail,
    contactNumber,
    user_id,
  };

  const { error } = await supabaseClient
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
  const yearsOfExperience = formData
    .get("yearsOfExperience")
    ?.slice(0, 90) as string;
  const specialization = formData
    .get("specialization")
    ?.slice(0, 100) as string;
  const birthYear = Number(formData.get("birthYear")?.slice(0, 90) as string);
  const user_id = session?.user?.userId as number;

  const createApplicantFormData: CreateApplicantFormDataI = {
    fullName,
    email,
    yearsOfExperience,
    specialization,
    birthYear,
    user_id,
  };

  const { error } = await supabaseClient
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
  const sessionAuth = await auth();

  if (!sessionAuth) {
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
  const price = Number(formData.get("price") as string);

  const line_items = [
    {
      price_data: {
        currency: "usd",
        product_data: { name: "Paying for updating a vacancy" },
        unit_amount: price * 100,
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `https://jobless-mu.vercel.app/dashboard/company/success-update?id=${id}&title=${encodeURIComponent(
      title
    )}&vacancyLocation=${encodeURIComponent(
      vacancyLocation
    )}&experienceRequired=${encodeURIComponent(
      experienceRequired
    )}&salary=${encodeURIComponent(salary)}&emailContact=${encodeURIComponent(
      emailContact
    )}`,
    cancel_url: `https://jobless-mu.vercel.app/dashboard/company/vacancies`,
  });

  revalidatePath("/dashboard/company/vacancies", "layout");
  redirect(session.url!);
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
}

//# server action for publishing a COMPANY vacancy
export async function publishCompanyVacancyAction(formData: FormData) {
  const sessionAuth = auth();

  if (!sessionAuth) {
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
  const price = Number(formData.get("price"));

  const line_items = [
    {
      price_data: {
        currency: "usd",
        product_data: { name: "Paying for publishing a vacancy" },
        unit_amount: price * 100,
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `https://jobless-mu.vercel.app/dashboard/company/success-publish?company_id=${company_id}&title=${encodeURIComponent(
      title
    )}&vacancyLocation=${encodeURIComponent(
      vacancyLocation
    )}&experienceRequired=${encodeURIComponent(
      experienceRequired
    )}&salary=${encodeURIComponent(salary)}&emailContact=${encodeURIComponent(
      emailContact
    )}`,
    cancel_url: `https://jobless-mu.vercel.app/dashboard/company/vacancies`,
  });

  revalidatePath("/dashboard/company/vacancies", "layout");
  redirect(session.url!);
}

//# server action for applying for a vacancy
export async function applyForVacancyAction(formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error(`You must be logged in`);
  }

  const user = await getUser(session?.user?.email || "");
  const role: string | undefined = user?.role;

  if (!role) {
    throw new Error(`You should have chosen the role`);
  }

  if (role !== "applicant") {
    throw new Error(`Your role must be "applicant"`);
  }

  const vacancy_id = Number(formData.get("vacancy_id") as string);
  const applicant_id = Number(formData.get("applicant_id") as string);
  const status: string = "applied";

  const applyForVacancyData: ApplyForVacancyDataI = {
    vacancy_id,
    applicant_id,
    status,
  };

  const { error } = await supabaseClient
    .from("applications")
    .insert([applyForVacancyData])
    .select()
    .single();

  if (error) {
    throw new Error(`Could not apply for the vacancy: ${error}`);
  }

  revalidatePath("/dashboard/applicant/vacancies", "layout");
}

//# server action for rejecting an applicant
export async function rejectApplicantAction(formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error(`You must be logged in`);
  }

  const user = await getUser(session?.user?.email);
  const role: string | undefined = user?.role;

  if (!role) {
    throw new Error(`You should have chosen the role`);
  }

  if (role !== "company") {
    throw new Error(`Your role must be "company"`);
  }

  const applicant_id: number = Number(formData.get("applicant_id") as string);
  const vacancy_id: number = Number(formData.get("vacancy_id") as string);

  const { error } = await supabaseClient
    .from("applications")
    .update({ status: "rejected" })
    .eq("applicant_id", applicant_id)
    .eq("vacancy_id", vacancy_id);

  if (error) {
    throw new Error(`Could not reject an applicant: ${error}`);
  }

  revalidatePath(`/dashboard/company/vacancies/${vacancy_id}`, "page");
}

//# server action for accepting an applicant
export async function acceptApplicantAction(formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error(`You must be logged in`);
  }

  const user = await getUser(session?.user?.email);
  const role: string | undefined = user?.role;

  if (!role) {
    throw new Error(`You should have chosen the role`);
  }

  if (role !== "company") {
    throw new Error(`Your role must be "company"`);
  }

  const applicant_id: number = Number(formData.get("applicant_id") as string);
  const vacancy_id: number = Number(formData.get("vacancy_id") as string);

  const { error } = await supabaseClient
    .from("applications")
    .update({ status: "accepted" })
    .eq("applicant_id", applicant_id)
    .eq("vacancy_id", vacancy_id);

  if (error) {
    throw new Error(`Could not accept an applicant: ${error}`);
  }

  revalidatePath(`/dashboard/company/vacancies/${vacancy_id}`, "page");
}
