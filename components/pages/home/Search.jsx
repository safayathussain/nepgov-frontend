import TextInput from "@/components/input/TextInput";
import React from "react";
import { CgClose, CgSearch } from "react-icons/cg";

const Search = ({ open, setOpen }) => {
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
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur.
                <br />
                Enim ultrices quisque proin leo.
              </p>
            </div>

            {/* Tracker Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Tracker</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur.
                <br />
                Enim ultrices quisque proin leo.
              </p>
            </div>
          </div>

          {/* Right Column - Categories */}
          <div>
            <h2 className="text-xl font-medium text-gray-700 mb-6">
              All Categories
            </h2>

            <nav className="space-y-3">
              <a
                href="#"
                className="block text-gray-600 hover:text-gray-900 transition-colors"
              >
                Business & Economy
              </a>
              <a
                href="#"
                className="block text-gray-600 hover:text-gray-900 transition-colors"
              >
                Digital and Technology
              </a>
              <a
                href="#"
                className="block text-gray-600 hover:text-gray-900 transition-colors"
              >
                Entertainment, Arts and Culture
              </a>
              <a
                href="#"
                className="block text-gray-600 hover:text-gray-900 transition-colors"
              >
                Health, Medicine and Beauty
              </a>
              <a
                href="#"
                className="block text-gray-600 hover:text-gray-900 transition-colors"
              >
                International
              </a>
              <a
                href="#"
                className="block text-gray-600 hover:text-gray-900 transition-colors"
              >
                Politics and Current Affairs
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
