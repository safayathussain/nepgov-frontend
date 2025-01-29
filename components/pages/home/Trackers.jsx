"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import TrackerStatus from "@/components/common/TrackerStatus";
import SimpleChart from "@/components/chart/SimpleChart";


export default function Trackers() {
  return (
    <div className="my-20">
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <p className="text-3xl font-semibold">Trackers</p>
          <Link href={""} className="text-primary font-semibold">
            View More
          </Link>
        </div>
        <div className="flex gap-3 relative">
          <button className="home-tracker-swiper-button-prev" aria-label="Previous Slide">
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
          <button className="home-tracker-swiper-button-next" aria-label="Next Slide">
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
        slidesPerView={3}
        spaceBetween={20}
        navigation={{
          prevEl: ".home-tracker-swiper-button-prev",
          nextEl: ".home-tracker-swiper-button-next",
        }}
        className="mt-5"
      >
        <SwiperSlide>
          <div className="p-5 border border-[#EBEBEB] shadow-medium">
            <Image src={'https://i.ibb.co.com/r0W0hdP/image-1.png'} width={363} height={180} alt="" className="w-full"></Image>
            <div className="flex justify-between py-3">
              <TrackerStatus/>
              <p>POLITICS</p>
            </div>
            <p className="text-xl font-semibold leading-tight">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p className="text-sm text-gray-400">about 2 hours ago</p>
            <SimpleChart height={150}/>
            <p className="text-secondary font-semibold text-xl mt-2">2000 people voted</p>
          </div>
        </SwiperSlide>  
        <SwiperSlide>
          <div className="p-5 border border-[#EBEBEB] shadow-medium">
            <Image src={'https://i.ibb.co.com/r0W0hdP/image-1.png'} width={363} height={180} alt="" className="w-full"></Image>
            <div className="flex justify-between py-3">
              <TrackerStatus/>
              <p>POLITICS</p>
            </div>
            <p className="text-xl font-semibold leading-tight">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p className="text-sm text-gray-400">about 2 hours ago</p>
            <SimpleChart height={150}/>
            <p className="text-secondary font-semibold text-xl mt-2">2000 people voted</p>
          </div>
        </SwiperSlide>  
        <SwiperSlide>
          <div className="p-5 border border-[#EBEBEB] shadow-medium">
            <Image src={'https://i.ibb.co.com/r0W0hdP/image-1.png'} width={363} height={180} alt="" className="w-full"></Image>
            <div className="flex justify-between py-3">
              <TrackerStatus/>
              <p>POLITICS</p>
            </div>
            <p className="text-xl font-semibold leading-tight">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p className="text-sm text-gray-400">about 2 hours ago</p>
            <SimpleChart height={150}/>
            <p className="text-secondary font-semibold text-xl mt-2">2000 people voted</p>
          </div>
        </SwiperSlide>  
        <SwiperSlide>
          <div className="p-5 border border-[#EBEBEB] shadow-medium">
            <Image src={'https://i.ibb.co.com/r0W0hdP/image-1.png'} width={363} height={180} alt="" className="w-full"></Image>
            <div className="flex justify-between py-3">
              <TrackerStatus/>
              <p>POLITICS</p>
            </div>
            <p className="text-xl font-semibold leading-tight">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p className="text-sm text-gray-400">about 2 hours ago</p>
            <SimpleChart height={150}/>
            <p className="text-secondary font-semibold text-xl mt-2">2000 people voted</p>
          </div>
        </SwiperSlide>  
      </Swiper>
    </div>
  );
}
