import CheckInput from "@/components/input/CheckInput";
import ReportChart from "@/components/pages/report/ReportChart";
import React from "react";

const page = () => {
  return (
    <div className="container">
      <style>
        {`
                .p-highlight > .p-checkbox-box {
  background-color: #3560AD !important;
  border-radius: 999px !important; 
}
                `}
      </style>
      <div className="container border border-lightGray rounded-xl py-10  my-10">
        <p className="text-center text-xl sm:text-2xl lg:text-4xl font-semibold max-w-[700px] mx-auto">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit, ad!
        </p>
        <div className="py-10 max-w-[700px] mx-auto space-y-2">
          <div className="border border-primary p-4 rounded-lg flex justify-between items-center flex-wrap">
            <div className="">
              <CheckInput boxClassName={"outline-primary"} label={"Agree"} />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className=" w-[150px] md:w-[300px] h-1 bg-gray-200 relative">
                <div className="h-1 bg-primary" style={{ width: "30%" }}></div>
              </div>
              <span>30%</span>
            </div>
          </div>
          <div className="bg-[#F3F4F6] p-4 rounded-lg flex justify-between items-center flex-wrap">
            <div className="">
              <CheckInput boxClassName={"outline-primary"} label={"Agree"} />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-[150px] md:w-[300px] h-1 bg-gray-200 relative">
                <div className="h-1 bg-primary" style={{ width: "30%" }}></div>
              </div>
              <span>30%</span>
            </div>
          </div>
          <div className="bg-[#F3F4F6] p-4 rounded-lg flex justify-between items-center flex-wrap">
            <div className="">
              <CheckInput boxClassName={"outline-primary"} label={"Agree"} />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-[150px] md:w-[300px] h-1 bg-gray-200 relative">
                <div className="h-1 bg-primary" style={{ width: "30%" }}></div>
              </div>
              <span>30%</span>
            </div>
          </div>
        </div>
        <ReportChart/>
      </div>
      <div>
      </div>
    </div>
  );
};

export default page;
