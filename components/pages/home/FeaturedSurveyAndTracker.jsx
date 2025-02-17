import SimpleChart from "@/components/chart/SimpleChart";
import ApproveDisapproveColor from "@/components/common/ApproveDisapproveColor";
import OptionsWithColor from "@/components/common/OptionsWithColor";
import SurveyStatus from "@/components/common/SurveyStatus";
import TrackerStatus from "@/components/common/TrackerStatus";
import { ImgUrl } from "@/utils/constants";
import { isLive, timeAgo, timeLeft } from "@/utils/functions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FeaturedSurveyAndTracker = ({ featuredSurveyTracker }) => {
  return (
    <div className="py-10">
      <div className="grid grid-cols-6 gap-5">
        <Link
          href={`/report/survey/1`}
          className="shadow-light  border col-span-6 lg:col-span-4 row-span-2 border-[#EBEBEB]"
        >
          <img
            src={ImgUrl + featuredSurveyTracker?.surveys[0]?.thumbnail}
            width={874}
            height={364}
            alt=""
            className="w-full coverImage"
          ></img>
          <div className="p-5 space-y-2">
            <SurveyStatus />
            <p className="text-2xl md:text-4xl font-semibold">
              {featuredSurveyTracker?.surveys[0]?.topic}
            </p>
            <p className="text-sm text-lightGray">
              {isLive(featuredSurveyTracker?.surveys[0]?.liveEndedAt)
                ? timeLeft(featuredSurveyTracker?.surveys[0]?.liveEndedAt)
                : timeAgo(featuredSurveyTracker?.surveys[0]?.liveEndedAt)}
            </p>
          </div>
        </Link>
        {featuredSurveyTracker?.trackers?.map((tracker) => (
          <Link
            key={tracker._id}
            href={"/report/tracker/1"}
            className="p-4 shadow-light border border-[#EBEBEB] flex flex-col justify-between gap-5 col-span-6 md:col-span-3 lg:col-span-2"
          >
            <div>
              <div className="flex justify-between">
                <TrackerStatus />
                <p className="text-lightGray">
                  {tracker.categories?.[0]?.name}
                </p>
              </div>
              <p className="text-xl font-semibold">{tracker.topic}</p>
              <OptionsWithColor options={tracker.options} />
            </div>
            <div className="">
              <SimpleChart height={190} />
            </div>
            <p className="text-sm text-lightGray">
              {isLive(tracker?.liveEndedAt)
                ? timeLeft(tracker?.liveEndedAt)
                : timeAgo(tracker?.liveEndedAt)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSurveyAndTracker;
