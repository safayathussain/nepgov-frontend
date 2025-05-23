"use client";
import { isLive } from "@/utils/functions";
import { useRouter } from "next/navigation";
import React from "react";
import { GoDotFill } from "react-icons/go";

const TopCrimeAndQuestionSection = ({ hero }) => {
  const router = useRouter();
  return (
    <div>
      <div className="text-white flex flex-col lg:flex-row gap-5 mt-8">
        <div className="bg-gradiantBg p-5 flex flex-col justify-between w-full gap-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p>CRIME REPORT</p>
              <p className="flex items-center gap-2 blink">
                Live <GoDotFill />
              </p>
            </div>
            <p className="text-[35px] font-semibold leading-tight lg:mr-8">
              Give crime information anonymously
            </p>
            <p>Your anonymity is 100% guaranteed.</p>
          </div>
          <div className="">
            <button
              onClick={() => router.push("/send-crime-info")}
              className="w-full bg-white text-secondary font-semibold rounded-full py-2 hover:bg-gray-200 duration-300"
            >
              Give Information Here
            </button>
          </div>
        </div>
        <div className="bg-gradiantBg2 p-5 flex flex-col justify-between w-full gap-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p>Daily Question</p>
              {isLive(
                hero?.dailyQuestion?.liveStartedAt,
                hero?.dailyQuestion?.liveEndedAt
              ) && (
                <p className="flex items-center gap-2 blink">
                  Live <GoDotFill />
                </p>
              )}
            </div>
            <p className="text-xl font-semibold">
              {hero?.dailyQuestion?.topic}
            </p>
          </div>
          <button
            onClick={() => router.push(`/trackers/${hero?.dailyQuestion?._id}`)}
            className="w-full bg-white text-secondary font-semibold rounded-full py-2 hover:bg-gray-200 duration-300"
          >
            Vote now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopCrimeAndQuestionSection;
