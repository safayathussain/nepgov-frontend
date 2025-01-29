import Categories from "@/components/pages/home/Categories";
import TopCrimeAndQuestionSection from "@/components/pages/home/TopCrimeAndQuestionSection";
import FeaturedSurveyAndTracker from "@/components/pages/home/FeaturedSurveyAndTracker";
import React from "react";
import LiveSurveyAndTracker from "@/components/pages/home/LiveSurveyAndTracker";
import Surveys from "@/components/pages/home/Surveys";
import Trackers from "@/components/pages/home/Trackers";
import Articles from "@/components/pages/home/Articles";
const page = () => {
  return (
    <div className="container py-10">
      <Categories />
      <TopCrimeAndQuestionSection/>
      <FeaturedSurveyAndTracker/>
      <LiveSurveyAndTracker/>
      <Surveys/>
      <Trackers/>
      <Articles/>
    </div>
  );
};

export default page;
