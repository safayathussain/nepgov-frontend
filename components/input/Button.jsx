"use client";
import React from "react";

const Button = ({
  children,
  variant = "primary",
  className,
  size = "md",
  onClick = () => {},
  disabled,
  ...etc
}) => {
  let variantClassName = "";
  let sizeClassName = "";
  switch (variant) {
    case "primary":
      variantClassName = "bg-primary text-white border-primary border-[1.5px]";
      break;
    case "secondary":
      variantClassName = "  bg-secondary text-white ";
      break;
    case "primary-outline":
      variantClassName = "border-[1.5px] border-primary text-primary   ";
      break;
  }
  switch (size) {
    case "sm":
      sizeClassName = " px-2 py-1 text-sm rounded-md";
      break;
    case "md":
      sizeClassName = "px-5 py-1.5 rounded-[8px] font-semibold";
      break;
    case "lg":
      sizeClassName = "px-6 py-2 rounded-[8px] font-semibold";
      break;
  }

  return (
    <button
      className={`font-medium ${variantClassName} ${sizeClassName} ${className} ${
        disabled && "opacity-60"
      } whitespace-nowrap`}
      onClick={onClick}
      {...etc}
    >
      {children}
    </button>
  );
};

export default Button;
