"use client";

import React, { useEffect } from "react";
import toast from "react-hot-toast";

const ScreenMonitorProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  useEffect(function () {
    //
    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      toast("You cannot access!", { duration: 2500 });
    };

    //
    const preventCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      toast("You cannot copy!", { duration: 2500 });
    };

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("copy", preventCopy);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("copy", preventCopy);
    };
  }, []);

  return <main>{children}</main>;
};

export default ScreenMonitorProvider;
