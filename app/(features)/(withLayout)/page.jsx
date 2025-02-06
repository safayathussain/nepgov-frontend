"use client"

import Categories from "@/components/pages/home/Categories";
import TopCrimeAndQuestionSection from "@/components/pages/home/TopCrimeAndQuestionSection";
import FeaturedSurveyAndTracker from "@/components/pages/home/FeaturedSurveyAndTracker";
import React, { useState } from "react";
import LiveSurveyAndTracker from "@/components/pages/home/LiveSurveyAndTracker";
import Surveys from "@/components/pages/home/Surveys";
import Trackers from "@/components/pages/home/Trackers";
import Articles from "@/components/pages/home/Articles";
import Search from "@/components/pages/home/Search";
const Page = () => {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div>
      <Search open={searchOpen} setOpen={setSearchOpen} />

      <div className="container py-10">
        <Categories setSearchOpen={setSearchOpen}/>
        <TopCrimeAndQuestionSection />
        <FeaturedSurveyAndTracker />
        <LiveSurveyAndTracker />
        <Surveys />
        <Trackers />
        <Articles />
      </div>
    </div>
  );
};

export default Page;
