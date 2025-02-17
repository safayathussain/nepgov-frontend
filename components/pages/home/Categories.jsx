import Link from "next/link";
import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";

const Categories = ({ setSearchOpen, categories }) => {
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap">
        {categories.map((item) => (
          <Link
            key={item._id}
            href={`/category/${item._id}`}
            className="px-3 py-1 rounded-full bg-[#F3F4F6]"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <button
        className="text-xl text-secondary"
        onClick={() => setSearchOpen(true)}
      >
        <IoMdSearch size={25} />
      </button>
    </div>
  );
};

export default Categories;
