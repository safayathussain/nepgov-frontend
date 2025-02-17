import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
const Footer = () => {
  const socialMedia = [
    {
      icon: <FaFacebook />,
      link: "",
    },
    {
      icon: <FaTwitter />,
      link: "",
    },
    {
      icon: <FaLinkedin />,
      link: "",
    },
    {
      icon: <FaInstagram />,
      link: "",
    },
    {
      icon: <FaYoutube />,
      link: "",
    },
  ];
  const routes = [
    {
      route: "/",
      name: "Home",
    },
    {
      route: "/about-us",
      name: "About",
    },
    {
      route: "/vote",
      name: "Vote",
    },
    {
      route: "/crime-info",
      name: "Crime information",
    },
    {
      route: "/login",
      name: "Log in",
    },
    {
      route: "/signup",
      name: "Sign up",
    },
  ];
  const routes2 = [
    {
      route: "/terms-and-conditions",
      name: "Terms & Conditions",
    },
    {
      route: "/privacy-policy",
      name: "Privacy Policy",
    },
    {
      route: "/cookie-policy",
      name: "Cookie Policy",
    },
  ];
  return (
    <div className="bg-primary text-white py-16">
      <div className="container">
        <div className=" flex flex-wrap justify-between gap-10">
          <div className="max-w-[400px]">
            <div>
              <p className="text-3xl font-bold">NepGov</p>
              <p className="mt-3 mb-1 text-lg font-semibold">About NepGov</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                corrupti sint necessitatibus placeat quia delectus asperiores
                nam omnis neque voluptatem.
              </p>
            </div>
            <div className="flex items-center gap-2 text-primary mt-5">
              {socialMedia?.map((item, i) => (
                <Link
                  key={i}
                  className="size-8 flex items-center justify-center rounded-full bg-white"
                  href={item?.link}
                >
                  {item?.icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            {routes?.map((item, i) => (
              <Link key={i} href={item?.route}>
                {item?.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col">
            {routes2?.map((item, i) => (
              <Link key={i} href={item?.route}>
                {item?.name}
              </Link>
            ))}
          </div>
        </div>
        <hr className=" my-5" />
        <p className="">Copyright © 2023 YouGov PLC. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
