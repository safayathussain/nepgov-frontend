"use client";
import Navbar from "@/components/common/Navbar";
import { useAuth } from "@/utils/functions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Layout = ({ children }) => {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth?._id) {
      router.push("/login");
    }
  }, [auth?._id, router]);

  if (!auth?._id) {
    return null;
  }

  return (
    <div className="bg-gradiantBg min-h-screen h-full">
      {auth?._id && (
        <>
          <Navbar />
          <div className="flex flex-col justify-between min-h-screen h-full">
            <div className="!max-w-[835px] container py-20">{children}</div>
            <div className="w-full">
              <hr />
              <div className="container flex justify-between flex-wrap text-white py-4">
                <p>Copyright © 2022 YouGov PLC. All Rights Reserved</p>
                <div className="flex gap-2 flex-wrap">
                  <Link href="/privacy-policy">Privacy Policy</Link>|
                  <Link href="/terms-and-conditions">Terms & Conditions</Link>|
                  <Link href="/cookie-policy">Cookie Policy</Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;
