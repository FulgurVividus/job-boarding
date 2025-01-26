import backgroundImage1 from "@/public/version_1.png";
import Image from "next/image";
import React from "react";
import LinkButton from "./LinkButton";

const SmallScreenMainPage: React.FC = () => {
  return (
    <main className="px-10 py-5 md:px-20 md:py-10">
      <Image
        src={backgroundImage1}
        fill
        alt="Main page image"
        placeholder="blur"
        priority
        quality={100}
        className="select-none object-cover bg-center"
      />

      <div className="flex flex-col items-center justify-center h-screen relative z-10">
        <section className="relative text-center bg-black/55 p-5 rounded-xl backdrop-blur-sm shadow-xl max-w-[90%] md:max-w-3xl mx-auto">
          <div className="mb-8 space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-mainSalmon via-mainBlue to-mainGreen drop-shadow-md">
              Welcome to{" "}
              <span className="text-mainSalmon font-extrabold underline decoration-wavy decoration-mainBlue">
                Jobless
              </span>
            </h1>
            <h2 className="text-sm md:text-lg font-medium leading-relaxed text-gray-200 italic drop-shadow-sm">
              Online job board platform
              <br />
              <span className="text-mainBlue font-semibold">
                Where jobless people become employed
              </span>
            </h2>
          </div>

          <div className="flex justify-center">
            <LinkButton
              href={"/login"}
              className="text-lg py-3 px-6 rounded-lg transition-all duration-300"
              title="Go to login page"
            >
              Register
            </LinkButton>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SmallScreenMainPage;
