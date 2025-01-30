import LiveStatus from "@/components/common/LiveStatus";
import SurveyStatus from "@/components/common/SurveyStatus";
import TrackerStatus from "@/components/common/TrackerStatus";
import Button from "@/components/input/Button";
import React from "react";

const LiveSurveyAndTracker = () => {
  return (
    <div className="bg-[#F3F4F6] p-5">
      <div className="flex items-end gap-5">
        <p className="text-2xl md:text-4xl font-semibold">Vote Now & Share Your Opinion!</p>
        <LiveStatus />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-4">
        <div className="p-5 bg-white border border-lightGray">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <SurveyStatus />
              <LiveStatus />
            </div>
            <p>POLITICS</p>
          </div>
          <div className="flex flex-col gap-5 justify-between">
            <p className="text-xl py-2 font-semibold">
              Will advice to drink less change how much alcohol you drink this
              Christmas? Plus, present wrapping, and Christmas pudding
            </p>
            <Button variant="primary-outline" className={"w-full"}>
              Vote Now
            </Button>
          </div>
        </div>
        <div className="p-5 bg-white border border-lightGray">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <SurveyStatus />
              <LiveStatus />
            </div>
            <p>POLITICS</p>
          </div>
          <div className="flex flex-col gap-5 justify-between">
            <p className="text-xl py-2 font-semibold">
              Will advice to drink less change how much alcohol you drink this
              Christmas? Plus, present wrapping, and Christmas pudding
            </p>
            <Button variant="primary-outline" className={"w-full"}>
              Vote Now
            </Button>
          </div>
        </div>
        <div className="p-5 bg-white border border-lightGray">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TrackerStatus />
              <LiveStatus />
            </div>
            <p>POLITICS</p>
          </div>
          <div className="flex flex-col gap-5 justify-between">
            <p className="text-xl py-2 font-semibold">
              Will advice to drink less change how much alcohol you drink this
              Christmas? Plus, present wrapping, and Christmas pudding
            </p>
            <Button variant="secondary-outline" className={"w-full"}>
              Vote Now
            </Button>
          </div>
        </div>
        <div className="p-5 bg-white border border-lightGray">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TrackerStatus />
              <LiveStatus />
            </div>
            <p>POLITICS</p>
          </div>
          <div className="flex flex-col gap-5 justify-between">
            <p className="text-xl py-2 font-semibold">
              Will advice to drink less change how much alcohol you drink this
              Christmas? Plus, present wrapping, and Christmas pudding
            </p>
            <Button variant="secondary-outline" className={"w-full"}>
              Vote Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSurveyAndTracker;
