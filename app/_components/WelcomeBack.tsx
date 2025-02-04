import dynamic from "next/dynamic";
import React from "react";
const GoToDashboard = dynamic(() => import("./GoToDashboard"));

interface WelcomeBackProps {
  user?:
    | {
        name: string;
        email: string;
        image: string;
        userId?: number;
        role?: string;
      }
    | undefined;

  createForm?:
    | {
        fullName: string | undefined;
        role: string | undefined;
      }
    | undefined;
}

const WelcomeBack: React.FC<WelcomeBackProps> = ({ user, createForm }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-center mb-4 text-2xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-mainSalmon via-mainBlue to-mainGreen drop-shadow-lg">
          Welcome back{" "}
          <span className="text-mainSalmon capitalize font-extrabold underline decoration-wavy decoration-mainBlue underline-offset-4">
            {user
              ? user?.name?.split(" ").at(0)
              : createForm?.fullName?.split(" ").at(0)}
          </span>{" "}
          <span className="text-black">!</span>
        </h1>

        <GoToDashboard userRole={user?.role || createForm?.role} />
      </div>
    </>
  );
};

export default WelcomeBack;
