import TrackerChart from "@/components/chart/TrackerChart";
import ArticleStatus from "@/components/common/ArticleStatus";
import OptionsWithColor from "@/components/common/OptionsWithColor";
import SurveyStatus from "@/components/common/SurveyStatus";
import TrackerStatus from "@/components/common/TrackerStatus";
import { ImgUrl } from "@/utils/constants";
import { isLive, timeAgo, timeLeft } from "@/utils/functions";
import Link from "next/link";
import React from "react";

const FeaturedSurveyAndTracker = ({ featuredSurveyTracker, allTrackers }) => {
  return (
    <div className="py-10 max-w-[1440px]">
      <div className="grid grid-cols-6 gap-5">
        {featuredSurveyTracker?.surveys[0]?._id && (
          <Link
            href={`/report/survey/${featuredSurveyTracker?.surveys[0]?._id}`}
            className="shadow-light  border col-span-6 flex flex-col md:flex-row items-center border-[#EBEBEB]"
          >
            <img
              src={ImgUrl + featuredSurveyTracker?.surveys[0]?.thumbnail}
              width={874}
              height={364}
              alt=""
              className="  coverImage w-full md:w-1/2 h-full"
            ></img>
            <div className="p-5 md:p-8 lg:p-12 space-y-3">
              <SurveyStatus />
              <p className="text-2xl md:text-4xl xl:text-5xl font-semibold">
                {featuredSurveyTracker?.surveys[0]?.topic}
              </p>
              <p className="text-sm text-lightGray">
                {isLive(
                  featuredSurveyTracker?.surveys[0]?.liveStartedAt,
                  featuredSurveyTracker?.surveys[0]?.liveEndedAt
                )
                  ? timeLeft(featuredSurveyTracker?.surveys[0]?.liveEndedAt)
                  : timeAgo(featuredSurveyTracker?.surveys[0]?.liveEndedAt)}
              </p>
            </div>
          </Link>
        )}
        {featuredSurveyTracker?.trackers?.map((tracker) => (
          <Link
            key={tracker._id}
            href={`/report/tracker/${tracker._id}`}
            className="p-5 shadow-light border border-[#EBEBEB] flex flex-col justify-between gap-5 col-span-6 md:col-span-3 lg:col-span-2"
          >
            <div>
              <div className="flex justify-between">
                <TrackerStatus />
                <p className="text-lightGray">
                  {tracker.categories?.[0]?.name}
                </p>
              </div>
              <p className="text-xl font-semibold my-2">{tracker.topic}</p>
              <OptionsWithColor options={tracker.options} />
            </div>
            <div className="-mt-5">
              <TrackerChart
                data={allTrackers?.find((item) => item._id === tracker._id)}
              />
            </div>
            <p className="text-sm text-lightGray">
              {isLive(tracker?.liveStartedAt, tracker?.liveEndedAt)
                ? timeLeft(tracker?.liveEndedAt)
                : timeAgo(tracker?.liveEndedAt)}
            </p>
          </Link>
        ))}
        {featuredSurveyTracker?.articles?.map((article) => (
          <Link
          key={article._id}
          href={`/article/${article?._id}`}
          className="p-5 shadow-light border border-[#EBEBEB] flex flex-col  gap-5 col-span-6 md:col-span-3 lg:col-span-2"
        >
          <img
            src={
              process.env.NEXT_PUBLIC_BASE_IMAGE_API +
              article?.thumbnail
            }
            width={300}
            height={150}
            alt=""
            className="w-full object-cover coverImage"
          />
          <div>
            <div className="flex justify-between">
              <ArticleStatus/>
              <p className="text-lightGray">
                {article.categories?.[0]?.name || "Uncategorized"}
              </p>
            </div>
            <p className="text-xl font-semibold mt-3">
              {article.title}
            </p>
          </div>
          <p className="text-sm text-lightGray mt-auto">
            {article.createdAt
              ? timeAgo(article.createdAt)
              : "Published recently"}
          </p>
        </Link>
        ))}

      </div>
    </div>
  );
};

export default FeaturedSurveyAndTracker;
