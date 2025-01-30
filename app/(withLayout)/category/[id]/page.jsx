import Articles from "@/components/pages/home/Articles";
import LiveSurveyAndTracker from "@/components/pages/home/LiveSurveyAndTracker";
import Surveys from "@/components/pages/home/Surveys";
import Trackers from "@/components/pages/home/Trackers";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="bg-primary py-20 text-white text-center">
        <p className=" text-4xl font-semibold ">Covid 19</p>
        <p>Explore the latest public opinion about Covid 19</p>
      </div>
      <div className="container">
        <div className="pt-20">

        <LiveSurveyAndTracker />
        </div>
        <Surveys/>
        <Trackers/>
        <Articles/>
      </div>
    </div>
  );
};

export default Page;
