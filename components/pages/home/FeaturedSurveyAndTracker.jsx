import SimpleChart from "@/components/chart/SimpleChart";
import ApproveDisapproveColor from "@/components/common/ApproveDisapproveColor";
import SurveyStatus from "@/components/common/SurveyStatus";
import TrackerStatus from "@/components/common/TrackerStatus";
import Image from "next/image";
import React from "react";

const FeaturedSurveyAndTracker = () => {
  return (
    <div className="py-10">
      <div className="grid grid-cols-6 gap-5">
        <div className="shadow-light  border col-span-6 lg:col-span-4 row-span-2 border-[#EBEBEB]">
          <Image
            src={
              "https://i.ibb.co.com/0rm95Dk/7dfd2d98ea5bcaefbb081aabbbb76ade.jpg"
            }
            width={874}
            height={364}
            alt=""
            className="w-full"
          ></Image>
          <div className="p-5 space-y-2">
            <SurveyStatus />
            <p className="text-4xl font-semibold">
              What is the current political situation, A complete research!
            </p>
            <p className="text-sm text-lightGray">30 minutes ago</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              pariatur, repudiandae architecto ipsa minima fugit deserunt enim
              molestias mollitia explicabo.
            </p>
          </div>
        </div>
        <div className="p-4 shadow-light border border-[#EBEBEB] flex flex-col justify-between gap-5 col-span-6 md:col-span-3 lg:col-span-2">
          <div>
            <div className="flex justify-between">
              <TrackerStatus />
              <p className="text-lightGray">POLITICS</p>
            </div>
            <p className="text-xl font-semibold">Government Approval</p>
            <ApproveDisapproveColor />
          </div>
          <div className="">
            <SimpleChart />
          </div>
        </div>
        <div className="p-4 shadow-light border border-[#EBEBEB] flex flex-col justify-between gap-5 col-span-6 md:col-span-3 lg:col-span-2">
          <div>
            <div className="flex justify-between">
              <TrackerStatus />
              <p className="text-lightGray">POLITICS</p>
            </div>
            <p className="text-xl font-semibold">Government Approval</p>
            <ApproveDisapproveColor />
          </div>
          <div className="">
            <SimpleChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSurveyAndTracker;
