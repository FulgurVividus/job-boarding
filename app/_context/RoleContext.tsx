"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface RoleContextType {
  role: string | undefined;
  setRole: Dispatch<SetStateAction<string | undefined>>;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<string | undefined>(undefined);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

function useRole() {
  const context = useContext(RoleContext);

  if (context === undefined) {
    throw new Error(`Context was used outside of the provider`);
  }

  return context;
}

export { RoleProvider, useRole };
