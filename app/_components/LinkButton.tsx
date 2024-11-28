import React from "react";
import Link from "next/link";

interface LinkButtonProps {
  children: React.ReactNode;
  href?: string;
  title?: string;
  className?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  href,
  title,
  className,
}) => {
  return (
    <Link
      href={href || ""}
      title={title}
      className={`${className} px-10 bg-mainBlue bg-gradient-to-r from-mainSalmon to-mainBlue transition-all duration-300 hover:scale-95 font-semibold text-mainWhite hover:text-mainBlack rounded-3xl text-center`}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
