"use client";
import Link from "next/link";
import React, { useState } from "react";
import Button from "../input/Button";

const CookieModal = () => {
  let acceptCookie = localStorage.getItem("acceptCookie");
  const [showModal, setshowModal] = useState(true);
  const handleAccept = () => {
    localStorage.setItem("acceptCookie", "accepted");
    setshowModal(false);
  };

  const handleReject = () => {
    localStorage.setItem("acceptCookie", "declined");
    setshowModal(false);
  };
  return (
    <div>
      {!acceptCookie && showModal && (
        <div className="fixed bottom-0 left-0 right-0 md:max-w-[400px] border md:bottom-4 md:right-4 md:left-auto z-50">
          <div className="bg-white   shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              We respect your privacy
            </h2>
            <p className="text-gray-600  ">
              We use cookies to operate this website, improve usability,
              personalize your experience and improve our marketing. Your
              privacy is important to us and we will never sell your data.{" "}
              <Link
                href="/privacy-policy"
                className="text-primary  underline font-bold"
              >
                Privacy Policy
              </Link>
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleAccept} className="w-full sm:w-auto">
                Accept Cookies
              </Button>
              <Button
                onClick={handleReject}
                variant="primary-outline"
                className="w-full sm:w-auto"
              >
                Reject All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookieModal;
