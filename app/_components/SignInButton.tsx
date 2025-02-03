import React from "react";
import LinkButton from "./LinkButton";
import Image from "next/image";
import { signInAction } from "@/app/_lib/actions";

const SignInButton: React.FC = () => {
  return (
    <button className="flex flex-col" onClick={signInAction} type="button">
      <LinkButton
        className="py-5 flex items-center gap-2"
        title="Sign in with Google"
      >
        <span>Sign In with Google</span>
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
      </LinkButton>
    </button>
  );
};

export default SignInButton;
