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
      className={`${className} px-6 py-2 md:px-10 md:py-3 bg-mainBlue bg-gradient-to-r from-mainSalmon to-mainBlue transition-all duration-300 hover:scale-95 font-semibold text-mainWhite hover:text-mainBlack rounded-3xl text-center uppercase shadow-lg hover:shadow-xl text-sm md:text-lg`}
      style={{
        fontFamily: "'Poppins', sans-serif",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
