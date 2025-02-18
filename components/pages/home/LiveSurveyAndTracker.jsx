import LiveStatus from "@/components/common/LiveStatus";
import SurveyStatus from "@/components/common/SurveyStatus";
import TrackerStatus from "@/components/common/TrackerStatus";
import Button from "@/components/input/Button";
import React from "react";

const LiveSurveyAndTracker = ({ liveSurveyTracker }) => {
  return (
    <div className="bg-[#F3F4F6] p-5">
      <div className="flex items-end gap-5">
        <p className="text-2xl md:text-4xl font-semibold">
          Vote Now & Share Your Opinion!
        </p>
        <LiveStatus />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-4">
        {liveSurveyTracker?.map((item) => (
          <div
            key={item?.data?._id}
            className="p-5 bg-white border border-lightGray"
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {item?.type === "Survey" ? (
                      <SurveyStatus />
                    ) : (
                      <TrackerStatus />
                    )}
                    <LiveStatus />
                  </div>
                  <p> {item?.data?.categories?.[0]?.name}</p>
                </div>
                <p className="text-xl py-2 font-semibold">
                  {item?.data?.topic}
                </p>
              </div>
              <div className="mt-2">
                <Button variant="primary-outline" className={"w-full"}>
                  Vote Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveSurveyAndTracker;
