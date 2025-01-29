import React from "react";
import { GoDotFill } from "react-icons/go";

const TopCrimeAndQuestionSection = () => {
  return (
    <div>
      <div className="text-white flex flex-col lg:flex-row gap-5 mt-8">
        <div className="bg-gradiantBg p-5 flex flex-col justify-between w-full gap-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p>CRIME REPORT</p>
              <p className="flex items-center gap-2">
                Live <GoDotFill />
              </p>
            </div>
            <p className="text-2xl font-semibold">
              Give crime information anonymously
            </p>
            <p>Your anonymity is 100% guaranteed.</p>
          </div>
          <div className="">
            <button className="w-full bg-white text-secondary font-semibold rounded-full py-2">
              Give Information Here
            </button>
          </div>
        </div>
        <div className="bg-gradiantBg2 p-5 flex flex-col justify-between w-full gap-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p>Daily Question</p>
              <p className="flex items-center gap-2">
                Live <GoDotFill />
              </p>
            </div>
            <p className="text-xl font-semibold">
              Will advice to drink less change how much alcohol you drink this
              Christmas? Plus, present wrapping, and Christmas pudding
            </p>
          </div>
          <button className="w-full bg-white text-secondary font-semibold rounded-full py-2">
            Vote now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopCrimeAndQuestionSection;
