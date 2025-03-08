"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/common/Navbar";
import Button from "@/components/input/Button";
import TextInput from "@/components/input/TextInput";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
import { FetchApi } from "@/utils/FetchApi";
import { setAuth } from "@/redux/slices/AuthSlice";
import { useDispatch } from "react-redux";
import { useAuth } from "@/utils/functions";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const { auth } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (auth?._id) return router.push("/");
  }, []);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    code: "",
  });
  const [step, setStep] = useState(1); // 1: SignIn, 2: OTP Verification

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async () => {
    try {
      const { data } = await FetchApi({
        method: "post",
        url: "/auth/signin",
        data: formData,
      });
      if (data?.success) {
        if (!data?.data?.user?.isVerified) {
          await FetchApi({
            method: "post",
            url: "/auth/send-otp",
            data: { email: formData.email },
          });
          setStep(2); // Show OTP screen
        } else {
          sessionStorage.setItem("accessToken", data?.data?.user?.accessToken);
          delete data?.data?.user?.accessToken;
          dispatch(setAuth(data?.data?.user));
          if (sessionStorage.getItem("voteRedirectUrl")) {
            router.push(sessionStorage.getItem("voteRedirectUrl"));
            sessionStorage.removeItem("voteRedirectUrl");
          } else {
            router.push("/");
          }
        }
      } else {
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const { data } = await FetchApi({
        method: "post",
        url: "/auth/verify-otp",
        data: { email: formData.email, otp: formData.code },
      });
      sessionStorage.setItem("accessToken", data?.data?.user?.accessToken);
      delete data?.data?.user?.accessToken;
      dispatch(setAuth(data?.data?.user));
      if (sessionStorage.getItem("voteRedirectUrl")) {
        router.push(sessionStorage.getItem("voteRedirectUrl"));
        sessionStorage.removeItem("voteRedirectUrl");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
    }
  };

  return (
    <div className="bg-[#EBEBEB] h-screen relative">
      <Navbar />
      <div className="flex items-center justify-center h-[90%]">
        <div className="p-8 space-y-3 w-[400px] m-4 bg-white">
          {step === 1 ? (
            <>
              <p className="text-2xl mb-5 font-bold">Log in</p>
              <TextInput
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextInput
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="flex justify-end">
                <Link
                  className=" underline text-secondary"
                  href={"/forget-pass"}
                >
                  Forget password?
                </Link>
              </div>
              <Button
                variant="secondary"
                className="w-full"
                onClick={handleSignIn}
              >
                Log in
              </Button>
              <p className="font-medium">
                Don’t have an account?{" "}
                <Link href="/signup" className="font-medium text-secondary">
                  Sign up
                </Link>
              </p>
            </>
          ) : (
            <>
              <IoArrowBackOutline
                className="text-2xl cursor-pointer text-secondary"
                onClick={() => setStep(1)}
              />
              <p className="text-2xl pt-5 font-bold">Please check your email</p>
              <p className="my-5">
                We've sent a code to {formData.email} to verify your email
                address. Please enter that code below to activate your account.
              </p>
              <TextInput
                label="Code"
                name="code"
                value={formData.code}
                onChange={handleChange}
              />
              <Button
                variant="secondary"
                className="w-full"
                onClick={handleVerifyOtp}
              >
                Verify
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
