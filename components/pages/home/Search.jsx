import TextInput from "@/components/input/TextInput";
import Link from "next/link";
import React, { useState } from "react";
import { CgClose, CgSearch } from "react-icons/cg";

const Search = ({ open, setOpen, categories, articles, surveys, trackers }) => {
  const [search, setsearch] = useState("");
  return (
    <div
      className={`fixed  w-screen overflow-y-scroll h-screen bg-white duration-300 z-50 p-5 ${
        open ? "top-0" : "-top-[100vh]"
      }`}
    >
      <div className="container relative">
        <CgClose
          size={35}
          className="ml-auto text-secondary absolute right-0 top-1 cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>
      <div className="container ">
        <div className="relative mt-10 md:mt-0">
          <TextInput
            placeholder={"Searh here..."}
            className={"w-full"}
            onChange={(e) => setsearch(e.target.value.toLowerCase())}
          ></TextInput>
          <CgSearch
            size={25}
            className="text-secondary w-max absolute top-2 right-3 cursor-pointer"
            onClick={() => console.log("hi")}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-5 ">
          {/* Left Column - Content Types */}
          <div>
            <h2 className="text-xl font-medium text-gray-700 mb-6">
              Browse Content by Type
            </h2>

            {/* Articles Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Articles
              </h3>
              <div className="flex flex-col gap-3">
                {articles
                  .filter((item) => item.title.toLowerCase().includes(search))
                  .map((item) => (
                    <Link key={item._id} className="!text-[16px] text-gray-500" href={""}>
                      {item?.title}
                    </Link>
                  ))}
              </div>
            </div>

            {/* Tracker Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Tracker</h3>
              <div className="flex flex-col gap-3">
                {trackers
                  .filter((item) => item.topic.toLowerCase().includes(search))
                  .map((item) => (
                    <Link key={item._id} className="!text-[16px] text-gray-500" href={""}>
                      {item?.topic}
                    </Link>
                  ))}
              </div>
            </div>
            {/* Survey Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Survey</h3>
              <div className="flex flex-col gap-3">
                {surveys
                  .filter((item) => item.topic.toLowerCase().includes(search))
                  .map((item) => (
                    <Link  key={item._id} className="!text-[16px] text-gray-500" href={""}>
                      {item?.topic}
                    </Link>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Column - Categories */}
          <div>
            <h2 className="text-xl font-medium text-gray-700 mb-6">
              All Categories
            </h2>

            <nav className="space-y-3">
              {categories.map((item) => (
                <Link
                  key={item._id}
                  href={`/category/${item._id}`}
                  className="block text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
