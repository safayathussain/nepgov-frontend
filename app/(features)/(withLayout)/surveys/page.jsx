"use client";
import Loading from "@/components/common/Loading";
import SurveyStatus from "@/components/common/SurveyStatus";
import { ImgUrl } from "@/utils/constants";
import { FetchApi } from "@/utils/FetchApi";
import { isLive, timeAgo, timeLeft } from "@/utils/functions";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await FetchApi({ url: "/survey" });
        setSurveys(data.data);
      } catch (error) {
        console.error("Error fetching surveys:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  function calculateVotedCount(questions) {
    if (!questions || questions.length === 0) return 0;
    const totalVotedCount = questions.reduce(
      (total, question) =>
        total + question.options.reduce((sum, option) => sum + option.votedCount, 0),
      0
    );
    return Math.round(totalVotedCount / questions.length);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container my-20">
      <p className="text-3xl font-medium">Surveys</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {surveys.map((item) => (
          <Link
            key={item?._id}
            href={`/report/survey/${item?._id}`}
            className="p-5 border border-[#EBEBEB] flex flex-col justify-between h-full"
          >
            <div>
              <Image
                src={ImgUrl + item?.thumbnail}
                width={363}
                height={180}
                alt=""
                className="w-full coverImage"
              />
              <div className="flex justify-between py-3">
                <SurveyStatus />
                <p>{item?.categories?.[0]?.name}</p>
              </div>
              <p className="text-xl font-semibold leading-tight">{item?.topic}</p>
            </div>
            <div className="mt-auto">
              <p className="text-sm text-gray-400">
                {isLive(item?.liveStartedAt, item?.liveEndedAt)
                  ? timeLeft(item?.liveEndedAt)
                  : timeAgo(item?.liveEndedAt)}
              </p>
              <p className="text-primary font-semibold text-xl mt-2">
                {calculateVotedCount(item?.questions)} people voted
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
