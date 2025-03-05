"use client";
import Loading from "@/components/common/Loading";
import Articles from "@/components/pages/home/Articles";
import LiveSurveyAndTracker from "@/components/pages/home/LiveSurveyAndTracker";
import Surveys from "@/components/pages/home/Surveys";
import Trackers from "@/components/pages/home/Trackers";
import { FetchApi } from "@/utils/FetchApi";
import { isLive, isScheduled } from "@/utils/functions";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [trackers, setTrackers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    const fetchData = async () => {
      const { data: categoryData } = await FetchApi({ url: `/category/${id}` });
      setCategory(categoryData.data);
      const { data: surveysData } = await FetchApi({
        url: `/survey?category=${id}`,
      });
      setSurveys(surveysData.data.filter(item => !isScheduled(item.liveStartedAt)));
      const { data: trackersData } = await FetchApi({
        url: `/tracker?category=${id}`,
      });
      setTrackers(trackersData.data.filter(item => !isScheduled(item.liveStartedAt)));
      const { data: articlesData } = await FetchApi({
        url: `/article?category=${id}`,
      });
      setArticles(articlesData.data);
      setloading(false);
    };
    fetchData();
  }, []);
  return (
    <div>
      {loading ? (
        <div className="min-h-screen flex items-center w-full">
          <Loading />
        </div>
      ) : (
        <>
          <div className="bg-primary py-20 text-white text-center">
            <p className=" text-4xl font-semibold ">{category?.name}</p>
          </div>
          <div className="container">
            <div className="pt-20">
              <LiveSurveyAndTracker
                liveSurveyTracker={[
                  ...surveys
                    .filter((item) => isLive(item?.liveStartedAt, item?.liveEndedAt))
                    .map((item) => {
                      return { data: item, type: "Survey" };
                    }),
                  ...trackers
                    .filter((item) => isLive(item?.liveStartedAt, item?.liveEndedAt))
                    .map((item) => {
                      return { data: item, type: "Tracker" };
                    }),
                ]}
              />
            </div>
            <Surveys
              surveys={surveys.filter((item) => !isLive(item?.liveStartedAt, item?.liveEndedAt))}
            />
            <Trackers
              trackers={trackers.filter((item) => !isLive(item?.liveStartedAt, item?.liveEndedAt))}
            />
            <Articles articles={articles} />
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
