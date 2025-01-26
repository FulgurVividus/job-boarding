import backgroundImage1 from "@/public/version_1.png";
import Image from "next/image";
import React from "react";
import LinkButton from "./LinkButton";

const BigScreenMainPage: React.FC = () => {
  return (
    <main className="px-10 py-5 md:px-20 md:py-10 flex h-screen relative">
      <div className="w-1/2 flex flex-col items-center justify-center">
        <section className="text-center">
          <div className="mb-10 text-center space-y-4">
            <h1 className="mb-2 text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-mainSalmon via-mainBlue to-mainGreen drop-shadow-lg">
              Welcome to{" "}
              <span className="text-mainSalmon font-extrabold underline decoration-wavy">
                Jobless
              </span>
            </h1>
            <h2 className="text-lg md:text-xl font-medium leading-relaxed text-gray-700 dark:text-gray-300 italic shadow-md">
              Online job board platform
              <br />
              <span className="text-mainBlue font-semibold">
                Where jobless people become employed
              </span>
            </h2>
          </div>

          <div className="flex justify-center items-center">
            <LinkButton
              href={"/login"}
              className={"py-5"}
              title="Go to login page"
            >
              Register
            </LinkButton>
          </div>
        </section>
      </div>

      <div className="w-1/2 absolute right-0 top-0 h-screen">
        <Image
          src={backgroundImage1}
          alt="Main page image"
          placeholder="blur"
          priority
          fill
          quality={100}
          className="select-none object-cover bg-center"
        />
      </div>
    </main>
  );
};

export default BigScreenMainPage;
