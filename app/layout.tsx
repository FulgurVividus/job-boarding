import type { Metadata } from "next";
import "@/app/_styles/globals.css";
import Provider from "./Provider";
import { RoleProvider } from "./_context/RoleContext";

export const metadata: Metadata = {
  title: {
    template: "Jobless | %s",
    default: "Welcome to Jobless",
  },
  description:
    "Jobless - the online job board platform, where jobless people become employed",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#FFFAF0] h-full">
      <body>
        <RoleProvider>
          <Provider>{children}</Provider>
        </RoleProvider>
      </body>
    </html>
  );
}

export default RootLayout;
