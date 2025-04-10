import "@/app/_styles/globals.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { RoleProvider } from "./_context/RoleContext";
const ScreenMonitorProvider = dynamic(() => import("./ScreenMonitorProvider"));
const Provider = dynamic(() => import("./Provider"));

export const metadata: Metadata = {
  title: {
    template: "Hirely | %s",
    default: "Welcome to Hirely",
  },
  description:
    "Hirely - the online job board platform, where jobless people become employed",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#FFFAF0] h-full">
      <body>
        <ScreenMonitorProvider>
          <RoleProvider>
            <Provider>
              <Toaster position="top-center" />
              {children}
            </Provider>
          </RoleProvider>
        </ScreenMonitorProvider>
      </body>
    </html>
  );
}

export default RootLayout;
