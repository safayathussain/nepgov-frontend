"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import ArticleStatus from "@/components/common/ArticleStatus";
import { ImgUrl } from "@/utils/constants";
import { timeAgo } from "@/utils/functions";
import { useEffect, useState } from "react";

export default function Articles({ articles }) {
   
  return (
    <div className="my-20">
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <p className="text-3xl font-semibold">Article</p>
          <Link href={""} className="text-primary font-semibold">
            View More
          </Link>
        </div>
        <div className="flex gap-3 relative">
          <button
            className="swiper-button-prev-article"
            aria-label="Previous Slide"
          >
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
          <button
            className="swiper-button-next-article"
            aria-label="Next Slide"
          >
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
          prevEl: ".swiper-button-prev-article",
          nextEl: ".swiper-button-next-article",
        }}
        className="mt-5"
        breakpoints={{
          768: { slidesPerView: 2 }, // md
          1024: { slidesPerView: 3 }, // lg
        }}
      >
        {articles?.map((item) => (
          <SwiperSlide key={item?._id}>
            <Link href={`/article/${item?._id}`}>
              <div className="p-5 border border-[#EBEBEB] shadow-medium h-full">
                <img
                  src={ImgUrl + item?.thumbnail}
                  width={363}
                  height={180}
                  alt=""
                  className="w-full coverImage"
                ></img>
                <div className="flex justify-between py-3">
                  <ArticleStatus />
                  <p>{item?.categories?.[0]?.name}</p>
                </div>
                <p className="text-xl font-semibold leading-tight">
                  {item?.title}
                </p>
                <p className="text-sm text-gray-400">
                  {timeAgo(item?.createdAt)}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
