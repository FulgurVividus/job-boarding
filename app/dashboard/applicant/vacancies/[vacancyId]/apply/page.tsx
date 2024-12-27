import { auth } from "@/app/_lib/auth";
import { getVacancy } from "@/app/_lib/services";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: Promise<{ vacancyId: string }> }) => {
  const { vacancyId } = await params;
  const { title } = await getVacancy(+vacancyId);

  const session = await auth();
  const role: string | undefined = session?.user?.role;

  if (!role) {
    redirect("/role");
  }

  if (role !== "applicant") {
    redirect("/no-access");
  }

  return (
    <>
      <main className="px-10 py-5 md:px-20 md:py-10 flex flex-col items-center max-h-full h-screen">
        <h1 className="text-center mb-10 text-4xl md:text-8xl font-extrabold">
          Apply for
        </h1>
        <h1 className="text-center mb-10 text-3xl md:text-6xl font-bold">
          {title}
        </h1>

        <form action="" className="flex flex-col justify-between">
          <section className="flex flex-col justify-center mx-auto">
            <div className="text-lg flex items-center gap-2">
              <label htmlFor="name" className="font-serif font-medium">
                Full name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="E.g: John Doe"
                className="outline-none bg-transparent"
              />
            </div>

            <div className="text-lg flex items-center gap-2">
              <label htmlFor="age" className="font-serif font-medium">
                Age:
              </label>
              <input
                type="number"
                name="age"
                id="age"
                required
                placeholder="E.g: 20"
                className="outline-none bg-transparent"
              />
            </div>

            <div className="text-lg flex items-center gap-2">
              <label htmlFor="experience" className="font-serif font-medium">
                Years of experience:
              </label>
              <input
                type="number"
                name="experience"
                id="experience"
                required
                placeholder="E.g: 5"
                className="outline-none bg-transparent"
              />
            </div>

            <div className="text-lg flex items-center gap-2">
              <label htmlFor="email" className="font-serif font-medium">
                Email:
              </label>
              <input
                type="text"
                name="email"
                id="email"
                required
                placeholder="E.g: john@gmail.com"
                className="outline-none bg-transparent"
              />
            </div>
          </section>

          <div className="mt-10 flex justify-center">
            <button
              title="Apply for this vacancy"
              className="py-5 px-10 bg-mainBlue bg-gradient-to-r from-mainSalmon to-mainBlue transition-all duration-300 hover:scale-95 font-semibold text-mainWhite hover:text-mainBlack rounded-3xl text-center"
            >
              Apply
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default Page;
