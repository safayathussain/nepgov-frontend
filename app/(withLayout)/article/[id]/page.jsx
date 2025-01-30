import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <Image
        src={
          "https://i.ibb.co.com/0rm95Dk/7dfd2d98ea5bcaefbb081aabbbb76ade.jpg"
        }
        width={874}
        height={364}
        alt=""
        className="w-full h-[400px] object-cover"
      ></Image>
      <div className="container max-w-[850px] py-10 ">
        <p className="text-4xl text-primary font-semibold">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam,
          reprehenderit?
        </p>
        <p className="py-3 font-medium text-[#808DA5]">
          written by Saul Ramirez | published on 26 Dec 2022, 6:15 AM
        </p>
        <div>{/* content */}</div>
        <div>
          <p className="text-3xl font-semibold text-">Read more</p>
          <div className="grid grid-cols-2 mt-5">
            {/* articles */}
            <Link href={"/article/1"}>
              <div className="p-5 border border-[#EBEBEB] shadow-medium">
                <Image
                  src={"https://i.ibb.co.com/r0W0hdP/image-1.png"}
                  width={363}
                  height={180}
                  alt=""
                  className="w-full"
                ></Image>
                <div className="flex justify-between py-3">
                  <p>POLITICS</p>
                </div>
                <p className="text-xl font-semibold leading-tight">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <p className="text-sm text-gray-400">about 2 hours ago</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
