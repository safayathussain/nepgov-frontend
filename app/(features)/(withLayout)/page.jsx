"use client";

import Categories from "@/components/pages/home/Categories";
import TopCrimeAndQuestionSection from "@/components/pages/home/TopCrimeAndQuestionSection";
import FeaturedSurveyAndTracker from "@/components/pages/home/FeaturedSurveyAndTracker";
import React, { useEffect, useState } from "react";
import LiveSurveyAndTracker from "@/components/pages/home/LiveSurveyAndTracker";
import Surveys from "@/components/pages/home/Surveys";
import Trackers from "@/components/pages/home/Trackers";
import Articles from "@/components/pages/home/Articles";
import Search from "@/components/pages/home/Search";
import { FetchApi } from "@/utils/FetchApi";
import { isLive } from "@/utils/functions";
import Loading from "@/components/common/Loading";
const Page = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [homePageData, setHomePageData] = useState(null);
  const [surveys, setSurveys] = useState([]);
  const [trackers, setTrackers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    const fetchData = async () => {
      const { data: categoriesData } = await FetchApi({ url: "/category" });
      setCategories(categoriesData.data);
      const { data: homeData } = await FetchApi({ url: "/home-page" });
      setHomePageData(homeData.data);
      setloading(false);
      const { data: surveysData } = await FetchApi({ url: "/survey" });
      setSurveys(surveysData.data);
      const { data: trackersData } = await FetchApi({ url: "/tracker" });
      setTrackers(trackersData.data);
      const { data: articlesData } = await FetchApi({ url: "/article" });
      setArticles(articlesData.data);
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
        <div>
          <Search
            categories={categories}
            articles={articles}
            surveys={surveys}
            trackers={trackers}
            open={searchOpen}
            setOpen={setSearchOpen}
          />
          <div className="container py-10">
            <Categories categories={categories} setSearchOpen={setSearchOpen} />
            <TopCrimeAndQuestionSection hero={homePageData?.hero} />
            <FeaturedSurveyAndTracker
              allTrackers={trackers}
              featuredSurveyTracker={homePageData?.featuredSurveyTracker}
            />
            <LiveSurveyAndTracker
              liveSurveyTracker={homePageData?.liveSurveyTracker?.filter(
                (item) => isLive(item?.data?.liveEndedAt)
              )}
            />
            <Surveys surveys={surveys} />
            <Trackers trackers={trackers} />
            <Articles articles={articles} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
