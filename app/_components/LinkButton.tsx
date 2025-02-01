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
      className={`${className} link-button`}
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
