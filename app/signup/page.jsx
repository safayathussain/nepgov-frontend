"use client";
import Navbar from "@/components/common/Navbar";
import Button from "@/components/input/Button";
import CheckInput from "@/components/input/CheckInput";
import TextInput from "@/components/input/TextInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

const page = () => {
  const [signUpStep, setSignUpStep] = useState(0);
  const router = useRouter()
  return (
    <div className="bg-[#EBEBEB] h-screen relative  ">
      <Navbar />
      <div className="flex items-center justify-center  h-[90%]">
        <div className="p-5 md:p-8   space-y-3 max-w-[600px] w-full m-4 bg-white">
          {signUpStep === 0 && (
            <>
              <p className="text-2xl  font-bold">Welcome to Nepgov</p>
              <p className="my-5">
                Let's get started with some basic questions. Please confirm that
                you live in the United Kingdom.
              </p>
              <div className="py-5 space-y-3">
                <TextInput label={"Email Address"} />
                <TextInput label={"Set a Password"} />
                <CheckInput
                  label={
                    "I agree to the Terms and Conditions, and acknowledge the privacy notice."
                  }
                />
              </div>
            </>
          )}
          {signUpStep === 1 && (
            <>
              <IoArrowBackOutline
                className="text-2xl cursor-pointer text-secondary"
                onClick={() => setSignUpStep(signUpStep - 1)}
              />
              <p className="text-2xl py-7 font-bold">
                In what year were you born?
              </p>

              <div className="py-5 space-y-3">
                <TextInput label={"Year of Birth"} placeholder={"Ex. 2000"} />
              </div>
            </>
          )}
          {signUpStep === 2 && (
            <>
              <IoArrowBackOutline
                className="text-2xl cursor-pointer text-secondary"
                onClick={() => setSignUpStep(signUpStep - 1)}
              />
              <p className="text-2xl py-7 font-bold">Are you...?</p>

              <p className="leading-none pt-5">Gender</p>
              <div className="pb-5 flex justify-between gap-3">
                <Button
                  variant="secondary-outline"
                  className={
                    "w-full border-[#C7C7C7] text-[#808DA5] hover:border-secondary"
                  }
                >
                  Male
                </Button>
                <Button
                  variant="secondary-outline"
                  className={
                    "w-full border-[#C7C7C7] text-[#808DA5] hover:border-secondary"
                  }
                >
                  Female
                </Button>
                <Button
                  variant="secondary-outline"
                  className={
                    "w-full border-[#C7C7C7] text-[#808DA5] hover:border-secondary"
                  }
                >
                  Other
                </Button>
              </div>
            </>
          )}
          {signUpStep === 3 && (
            <>
              <IoArrowBackOutline
                className="text-2xl cursor-pointer text-secondary"
                onClick={() => setSignUpStep(signUpStep - 1)}
              />
              <p className="text-2xl py-7 font-bold">Postcode</p>

              <div className="py-5 space-y-3">
                <TextInput label={"Postcode"} placeholder={"Ex. SW1W 0NY"} />
              </div>
            </>
          )}
          {signUpStep === 4 && (
            <>
              <IoArrowBackOutline
                className="text-2xl cursor-pointer text-secondary"
                onClick={() => setSignUpStep(signUpStep - 1)}
              />
              <>
                <p className="text-2xl pt-5 font-bold">
                  Please check your email
                </p>
                <p className="my-5">
                  We’ve sent a code to kpbhatta@gmail.com to verify your email
                  address. Please enter that code below to activate your
                  account.
                </p>
                <div className="py-5 space-y-3">
                  <TextInput label={"Code"} />
                </div>
              </>
            </>
          )}
          {signUpStep === 5 && (
            <div className="py-20 px-10">
              <svg
                width="67"
                height="68"
                viewBox="0 0 67 68"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28.3083 49.575L54.4521 23.4312L49.2604 18.2396L28.3083 39.1917L17.7396 28.6229L12.5479 33.8146L28.3083 49.575ZM7.54167 67.375C5.50208 67.375 3.75546 66.6494 2.30179 65.1982C0.850597 63.7445 0.125 61.9979 0.125 59.9583V8.04167C0.125 6.00208 0.850597 4.25546 2.30179 2.80179C3.75546 1.3506 5.50208 0.625 7.54167 0.625H59.4583C61.4979 0.625 63.2445 1.3506 64.6982 2.80179C66.1494 4.25546 66.875 6.00208 66.875 8.04167V59.9583C66.875 61.9979 66.1494 63.7445 64.6982 65.1982C63.2445 66.6494 61.4979 67.375 59.4583 67.375H7.54167Z"
                  fill="#EF4634"
                />
              </svg>
              <p className="text-2xl pt-5 font-bold">Congratulations</p>
              <p className="py-4">Your account was successfully created.</p>
              <Button
                variant="secondary"
                onClick={() => router.push('/')}
              >
                Back to Home
              </Button>
            </div>
          )}
          {signUpStep !== 5 && (
            <>
              <hr className="my-5" />
              <div className="flex justify-between flex-wrap-reverse gap-3 items-center">
                {signUpStep === 0 && (
                  <p className="font-medium">
                    Already have an account?{" "}
                    <Link
                      href={"/login"}
                      className="font-medium text-secondary"
                    >
                      Log in
                    </Link>
                  </p>
                )}
                <Button
                  variant="secondary"
                  className={"ml-auto"}
                  onClick={() => setSignUpStep(signUpStep + 1)}
                >
                  Next
                </Button>
              </div>
            </>
          )}
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
