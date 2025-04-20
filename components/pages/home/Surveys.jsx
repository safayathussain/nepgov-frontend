"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import SurveyStatus from "@/components/common/SurveyStatus";
import { isLive, timeAgo, timeLeft } from "@/utils/functions";
import { ImgUrl } from "@/utils/constants";

export default function Surveys({ surveys }) {
  function calculateVotedCount(questions) {
    const totalVotedCount = questions.reduce((total, question) => {
      return (
        total +
        question.options.reduce((sum, option) => sum + option.votedCount, 0)
      );
    }, 0);
    return totalVotedCount/questions.length;
  }
  return (
    <div className="my-20">
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <p className="text-3xl font-semibold">Surveys</p>
          <Link href={"/surveys"} className="text-primary font-semibold">
            View More
          </Link>
        </div>
        <div className="flex gap-3 relative">
          <button className="swiper-button-prev" aria-label="Previous Slide">
            <svg
              width="39"
              height="38"
              viewBox="0 0 39 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="18.8281"
                cy="18.8281"
                r="17.8281"
                transform="matrix(-1 0 0 1 38.3438 0.171875)"
                stroke="#3560AD"
                strokeWidth="2"
              />
              <path
                d="M23.4111 9.91064L14.6463 18.6755L23.4111 27.4403"
                stroke="#3560AD"
                strokeWidth="2"
              />
            </svg>
          </button>
          <button className="swiper-button-next" aria-label="Next Slide">
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="19.1719"
                cy="19"
                r="17.8281"
                stroke="#3560AD"
                strokeWidth="2"
              />
              <path
                d="M15.2764 9.91064L24.0412 18.6755L15.2764 27.4403"
                stroke="#3560AD"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* 3 slide in view */}
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={20}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        className="mt-5  "
        breakpoints={{
          768: { slidesPerView: 2 }, // md
          1024: { slidesPerView: 3 }, // lg
        }}
      >
        {surveys?.map((item) => (
          <SwiperSlide key={item?._id}>
            <Link
              href={`/surveys/${item?._id}`}
              className="p-5 border border-[#EBEBEB] shadow-medium flex flex-col justify-between h-full"
            >
              <div>
                <Image
                  src={ImgUrl + item?.thumbnail}
                  width={363}
                  height={180}
                  alt=""
                  className="w-full coverImage"
                ></Image>
                <div className="flex justify-between py-3 ">
                  <SurveyStatus />
                  <p> {item?.categories?.[0]?.name}</p>
                </div>
                <p className="text-xl font-semibold leading-tight">
                  {item?.topic}
                </p>
              </div>
              <div className="mt-auto">
                <p className="text-sm text-gray-400 ">
                  {isLive(item?.liveStartedAt, item?.liveEndedAt)
                    ? timeLeft(item?.liveEndedAt)
                    : timeAgo(item?.liveEndedAt)}
                </p>
                <p className="text-primary font-semibold text-xl mt-2">
                  {calculateVotedCount(item?.questions)} people voted
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
