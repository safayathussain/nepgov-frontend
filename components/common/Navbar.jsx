"use client"
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/logo.svg";
import Link from "next/link";
import homeIcon from "@/public/icons/home.svg";
import { RiShareBoxLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import { usePathname } from "next/navigation";
import SelectInput from "../input/SelectInput";
import Button from "../input/Button";
const Navbar = () => {
  const pathname = usePathname();
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
    { name: "English", value: "en" },
    { name: "Spanish", value: "es" },
    { name: "French", value: "fr" },
    { name: "German", value: "de" },
    { name: "Nepali", value: "ne" },
  ];
  const [selectedLanguage, setselectedLanguage] = useState(null)
  return (
    <div className="container">
      <div className="p-5 flex items-center justify-between">
        <Link href={"/"}>
          <Image src={logo} alt="logo" className="max-w-[140px]" />
        </Link>
        <div className="flex items-center gap-5">
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
        <div className="flex items-center gap-3">
          <SelectInput placeholder={'English (Change)'} options={languageOptions} setValue={setselectedLanguage} value={selectedLanguage} className={'!text-[10px] !border-0'}/>
          <Button variant={"primary-outline"} className={'flex items-center gap-1 !rounded-full'} size="sm"><CgProfile/> Log in</Button>
          <Button variant={"primary"} className={'flex items-center gap-1 !rounded-full'} size="sm"><IoMdAdd size={20}/> Sign up</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
