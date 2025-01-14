import Navbar from "@/components/common/Navbar";
import Button from "@/components/input/Button";
import TextInput from "@/components/input/TextInput";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="bg-[#EBEBEB] h-screen relative  ">
      <Navbar />
      <div className="flex items-center justify-center  h-[90%]">
        <div className="p-8   space-y-3 w-[400px] m-4 bg-white">
          <p className="text-2xl mb-5 font-bold">Log in</p>
          <TextInput label={"Email Address"} />
          <TextInput label={"Password"} />
          <Button variant="secondary" className={"w-full"}>
            Log in
          </Button>
          <p className="font-medium">
            Don’t have an account?{" "}
            <Link href={"/signup"} className="font-medium text-secondary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <hr className=" opacity-25 border-darkGray text-darkGray container" />
        <div className="flex justify-between flex-wrap container py-5 gap-5">
          <p className="text-sm md:text-base">
            Copyright © 2022 YouGov PLC. All Rights Reserved
          </p>
          <div className="flex items-center flex-wrap gap-2 text-sm md:text-base">
            <Link href={"/privacy"}>Privacy Policy</Link>|
            <Link href={"terms&conditions"}>Terms & Conditions</Link>|
            <Link href={"/cookie"}>Cookie Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
