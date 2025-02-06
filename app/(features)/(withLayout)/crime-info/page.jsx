"use client"
import Button from "@/components/input/Button";
import UnprocessableInfo from "@/components/pages/crime/UnprocessableInfo";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const cards = [
    {
      title: "NepGov is is not the police",
      description: "We are an independent charity working to help communities",
    },
    {
      title: "Nobody will know you have helped us",
      description:
        "Your computer and mobile phone IP addresses cannot be tracked or saved. It's completely anonymous",
    },
    {
      title: "We pay cash rewards of up to £1,000",
      description:
        "If the information you give us leads to an arrest or is of significant use you will be rewarded.",
    },
  ];
  const router = useRouter()
  return (
    <div>
      <div className="bg-gradiantBg py-20 text-white space-y-2 px-4">
        <p className="text-4xl font-semibold max-w-[400px] mx-auto text-center">
          Give crime information anonymously
        </p>
        <p className="text-center max-w-[400px] mx-auto">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. A reiciendis
          ratione, hic laboriosam et quis.
        </p>
        <div className="flex justify-center ">
          <Button
            className={" bg-white !text-primary hover:bg-white"}
            variant="primary"
            onClick={() => router.push('/send-crime-info')}
          >
            Give Information Here
          </Button>
        </div>
      </div>
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-primary text-white p-6  "
            >
              <h2 className="text-2xl font-bold mb-4">{card.title}</h2>
              <p className="  leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
      <UnprocessableInfo/>
      <div className="flex justify-center my-20">
          <Button
            variant="primary"
            onClick={() => router.push('/send-crime-info')}

          >
            Give Information Here
          </Button>
        </div>
    </div>
  );
};

export default page;
