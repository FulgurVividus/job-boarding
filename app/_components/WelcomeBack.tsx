import React from "react";
import GoToDashboard from "./GoToDashboard";

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
        <h1 className="text-center mb-2 text-xl md:text-2xl font-semibold">
          Welcome back{" "}
          <span className="text-mainSalmon capitalize font-extrabold">
            {user
              ? user?.name?.split(" ").at(0)
              : createForm?.fullName?.split(" ").at(0)}
          </span>{" "}
          !
        </h1>

        <GoToDashboard userRole={user?.role || createForm?.role} />
      </div>
    </>
  );
};

export default WelcomeBack;
