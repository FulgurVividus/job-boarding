"use client";

import React, { useState } from "react";
import { RadioGroup, Radio } from "@nextui-org/react";
import Link from "next/link";
import { useRole } from "@/app/_context/RoleContext";
import { storeRole } from "@/app/_lib/services";

interface Props {
  user:
    | {
        name: string;
        email: string;
        image: string;
        userId?: number;
        role?: string;
      }
    | undefined;
}

const RoleChoice: React.FC<Props> = ({ user }) => {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [chosen, setChosen] = useState<boolean>(false);
  const { setRole } = useRole();

  async function handleRoleSubmit() {
    if (selected && user?.userId) {
      setRole(selected);
      await storeRole(selected, user.userId);
    }
  }

  return (
    <>
      <h1 className="text-center mb-5 text-xl md:text-2xl font-extrabold">
        Choose your role:
      </h1>

      <form>
        <div className="flex flex-col gap-3">
          <RadioGroup
            value={selected}
            onValueChange={setSelected}
            onChange={() => setChosen(true)}
            isRequired={true}
            color="primary"
          >
            <Radio value="company" name="company" id="company" size="lg">
              Company
            </Radio>
            <Radio value="applicant" name="applicant" id="applicant" size="lg">
              Applicant
            </Radio>
          </RadioGroup>
          {chosen && (
            <Link href={"/create-form"}>
              <button
                className="px-10 py-2 bg-mainBlue bg-gradient-to-r from-mainSalmon to-mainBlue transition-all duration-300 hover:scale-95 font-semibold text-mainWhite hover:text-mainBlack rounded-3xl text-center mt-5"
                title="Submit the role"
                type="submit"
                onClick={handleRoleSubmit}
              >
                Go
              </button>
            </Link>
          )}
        </div>
      </form>
    </>
  );
};

export default RoleChoice;
