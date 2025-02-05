"use client";
import React, { useState } from "react";
import Navbar from "@/components/common/Navbar";
import Button from "@/components/input/Button";
import TextInput from "@/components/input/TextInput";
import { IoArrowBackOutline } from "react-icons/io5";
import { FetchApi } from "@/utils/FetchApi";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/slices/AuthSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [step, setStep] = useState(1); // 1: Enter Email, 2: Enter OTP, 3: Enter New Password

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    try {
      const { data } = await FetchApi({
        method: "post",
        url: "/auth/send-otp",
        data: { email: formData.email },
        callback: () =>setStep(2)

      }); 
    } catch (error) {
      console.error("Send OTP error:", error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const { data } = await FetchApi({
        method: "post",
        url: "/auth/verify-otp-for-pass",
        data: { email: formData.email, otp: formData.otp },
        callback: () =>setStep(3)
      }); 
    } catch (error) {
      console.error("OTP verification error:", error);
    }
  };

  const handleResetPassword = async () => {
    try {
      const { data } = await FetchApi({
        method: "post",
        url: "/auth/reset-password",
        data: { email: formData.email, newPassword: formData.newPassword, otp: formData.otp },
      }); 
      dispatch(setAuth(data?.data?.user))
      window.location.href = "/"
    } catch (error) {
      console.error("Reset password error:", error);
    }
  };

  return (
    <div className="bg-[#EBEBEB] h-screen relative">
      <Navbar />
      <div className="flex items-center justify-center h-[90%]">
        <div className="p-8 space-y-3 w-[400px] m-4 bg-white">
          {step === 1 && (
            <>
              <p className="text-2xl mb-5 font-bold">Reset Password</p>
              <TextInput label="Email Address" name="email" value={formData.email} onChange={handleChange} />
              <Button variant="secondary" className="w-full" onClick={handleSendOtp}>
                Send OTP
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <IoArrowBackOutline className="text-2xl cursor-pointer text-secondary" onClick={() => setStep(1)} />
              <p className="text-2xl pt-5 font-bold">Verify OTP</p>
              <TextInput label="OTP" name="otp" value={formData.otp} onChange={handleChange} />
              <Button variant="secondary" className="w-full" onClick={handleVerifyOtp}>
                Verify OTP
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <IoArrowBackOutline className="text-2xl cursor-pointer text-secondary" onClick={() => setStep(2)} />
              <p className="text-2xl pt-5 font-bold">Enter New Password</p>
              <TextInput label="New Password" name="newPassword" type="password" value={formData.newPassword} onChange={handleChange} />
              <Button variant="secondary" className="w-full" onClick={handleResetPassword}>
                Reset Password
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;