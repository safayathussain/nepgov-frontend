"use client";

import "primereact/resources/themes/lara-light-cyan/theme.css";

import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
const DropdownInput = ({
  name,
  placeholder,
  options = [],
  value = null,
  setValue = () => {},
  className,
  label,
  ...etc
}) => {
  return (
    <div>
      <label className="block text-black text-[14px] mb-0.5">{label}</label>
      <Dropdown
        value={value}
        onChange={(e) => setValue(e.value)}
        options={options}
        name={name}
        placeholder={placeholder}
        className={`w-full border shadow-none ${className}`}
        optionLabel="name"
        optionValue="value"
        {...etc}
      />
    </div>
  );
};

export default DropdownInput;
