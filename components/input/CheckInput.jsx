"use client";
import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
const CheckInput = ({
  label,
  id,
  name,
  type = "text",
  className,
  placeholder,
  value = false,
  setValue = () => {},
  ...etc
}) => {
  return (
    <PrimeReactProvider>
      <div className={`${className}`}>
        <div className="flex gap-3 items-center">
          <Checkbox
            checked={value}
            onChange={(e) => setValue(e.checked)}
            placeholder={placeholder}
            id={id}
            name={name}
            spellCheck="false"
            className={`outline outline-[2px]  outline-secondary size-4`}
            {...etc}
          />
          <label htmlFor={id} className="block text-black text-sm">
            {label}
          </label>
        </div>
      </div>
    </PrimeReactProvider>
  );
};

export default CheckInput;
