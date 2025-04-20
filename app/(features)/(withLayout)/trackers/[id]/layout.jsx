import Navbar from "@/components/common/Navbar";
import Link from "next/link";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="bg-gradiantBg min-h-screen h-full"> 
      <div className="flex flex-col justify-between min-h-screen h-full">
        <div className=" py-20">{children}</div>
        <div className=" w-full">
          <hr />
          <div className="container flex justify-between flex-wrap text-white py-4">
            <p>Copyright © 2022 YouGov PLC. All Rights Reserved</p>
            <div className="flex gap-2 flex-wrap">
              <Link href={"/privacy-policy"}>Privacy Policy</Link>|
              <Link href={"terms-and-conditions"}>Terms & Conditions</Link>|
              <Link href={"cookie-policy"}>Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
