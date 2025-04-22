"use client";
import TrackerChart from "@/components/chart/TrackerChart";
import LiveStatus from "@/components/common/LiveStatus";
import Loading from "@/components/common/Loading";
import OptionsWithColor from "@/components/common/OptionsWithColor";
import TrackerStatus from "@/components/common/TrackerStatus";
import { FetchApi } from "@/utils/FetchApi";
import { isLive, timeAgo, timeLeft } from "@/utils/functions";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [trackers, setTrackers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await FetchApi({ url: "/tracker" });
        setTrackers(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container my-20">
      <p className="text-3xl font-medium">Trackers</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {trackers.map((item) => (
          <Link key={item._id} href={`/trackers/${item._id}`}>
            <div className="p-5 border border-[#EBEBEB] flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between py-3">
                  <div className="flex items-center gap-2">
                    <TrackerStatus />
                    {isLive(item?.liveStartedAt, item?.liveEndedAt) && (
                      <LiveStatus />
                    )}
                  </div>
                  <p>{item?.categories?.[0]?.name}</p>
                </div>
                <p className="text-xl font-semibold leading-tight mb-3">
                  {item?.topic}
                </p>
                <OptionsWithColor options={item?.options} />
              </div>

              <div>
                <TrackerChart height={150} data={item} />
                <p className="text-sm text-gray-400">
                  {isLive(item?.liveStartedAt, item?.liveEndedAt)
                    ? timeLeft(item?.liveEndedAt)
                    : timeAgo(item?.liveEndedAt)}
                </p>
                <p className="text-secondary font-semibold text-xl mt-2">
                  {item?.options.reduce(
                    (total, option) => total + option.votedCount,
                    0
                  )}{" "}
                  people voted
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
