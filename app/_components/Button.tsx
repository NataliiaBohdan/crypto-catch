import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={` bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-4 rounded-lg transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
