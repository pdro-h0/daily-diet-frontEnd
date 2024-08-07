import React, { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  children: React.ReactNode;
}

const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={`bg-gray-800 rounded-md py-3 w-full text-white ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
