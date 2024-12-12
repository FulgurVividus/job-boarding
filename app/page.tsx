import React from "react";
import LinkButton from "./_components/LinkButton";

const Page: React.FC = () => {
  return (
    <main className="px-10 py-5 md:px-20 md:py-10 flex justify-between items-center">
      <section className="flex flex-col">
        <div className="mb-10">
          <h1>Welcome to Jobless</h1>
          <h2>Online job board platform</h2>
        </div>

        <LinkButton href={"/login"} className={"py-5"} title="Go to login page">
          Register
        </LinkButton>
      </section>

      <section>
        {/* TODO: image */}
        <h1>Image</h1>
      </section>
    </main>
  );
};

export default Page;
