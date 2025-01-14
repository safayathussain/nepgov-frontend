"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import logo from "@/public/logo.svg";
import Link from "next/link";
import homeIcon from "@/public/icons/home.svg";
import { RiShareBoxLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import LanguageSelectInput from "../input/NavbarLanguageSelectInput";
import Button from "../input/Button";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import useClickOutside from "@/hooks/useClickOutside";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const routes = [
    {
      label: <Image src={homeIcon} alt="" className="size-6" />,
      link: "/",
    },
    {
      label: "About Us",
      link: "/about",
    },
    {
      label: (
        <p className="flex items-center gap-1">
          Vote Now
          <RiShareBoxLine />
        </p>
      ),
      link: "/vote",
    },
    {
      label: (
        <p className="flex items-center gap-1">
          Crime Information
          <RiShareBoxLine />
        </p>
      ),
      link: "/crime-info",
    },
  ];

  const languageOptions = [
    { name: "English ", value: "en" },
    { name: "Spanish", value: "es" },
    { name: "French", value: "fr" },
    { name: "German", value: "de" },
    { name: "Nepali", value: "ne" },
  ];

  const [selectedLanguage, setselectedLanguage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const sidebarRef = useRef();
  useClickOutside(sidebarRef, () => {
    setSidebarOpen(false);
  });
  return (
    <div className="shadow-lg bg-white">
      <div className="container">
        <div className="py-5 flex items-center justify-between">
          <Link href={"/"}>
            <Image
              src={logo}
              alt="logo"
              className="max-w-[100px] lg:max-w-[140px]"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-5">
            {routes.map((item, i) => (
              <Link
                key={i}
                href={item?.link}
                className={`font-semibold ${
                  pathname === item.link ? "text-black " : "text-lightGray"
                }`}
              >
                {item?.label}
              </Link>
            ))}
          </div>

          {/* Language, Log in, Sign up */}
          <div className="flex items-center gap-3">
            <LanguageSelectInput
              options={languageOptions}
              setValue={setselectedLanguage}
              value={selectedLanguage}
              className={"!text-[10px] !border-0 hidden md:block"}
            />
            <Button
              variant={"primary-outline"}
              className={"flex items-center gap-1 !rounded-full"}
              size="sm"
              onClick={() => router.push("/login")}
            >
              <CgProfile /> Log in
            </Button>
            <Button
              variant={"primary"}
              className={"  hidden md:flex items-center gap-1 !rounded-full"}
              size="sm"
              onClick={() => router.push("/signup")}
            >
              <IoMdAdd size={20} /> Sign up
            </Button>
            {/* Hamburger Menu Icon */}
            <div className="lg:hidden flex items-center cursor-pointer">
              <AiOutlineMenu size={30} onClick={toggleSidebar} />
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar for Mobile */}
      <div
        ref={sidebarRef}
        className={`fixed  z-50  duration-300 shadow-2xl h-screen ${
          sidebarOpen ? "left-0 top-0 " : "-left-96 top-0"
        }`}
      >
        <div className="bg-white w-64 h-full flex flex-col p-5 relative">
          <AiOutlineClose
            size={30}
            className="absolute right-4 cursor-pointer"
            onClick={toggleSidebar}
          />
          <div className="flex flex-col mt-10">
            {routes.map((item, i) => (
              <Link
                key={i}
                href={item?.link}
                onClick={() => setSidebarOpen(false)}
                className={`font-semibold my-2 ${
                  pathname === item.link ? "text-black" : "text-lightGray"
                }`}
              >
                {item?.label}
              </Link>
            ))}
            <LanguageSelectInput
              options={languageOptions}
              setValue={setselectedLanguage}
              value={selectedLanguage}
              className={"!text-[10px] !border-0 md:hidden -ml-2 block"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
