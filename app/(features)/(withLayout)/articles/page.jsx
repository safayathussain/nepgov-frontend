"use client";

import ArticleStatus from "@/components/common/ArticleStatus";
import Loading from "@/components/common/Loading";
import { ImgUrl } from "@/utils/constants";
import { FetchApi } from "@/utils/FetchApi";
import { timeAgo } from "@/utils/functions";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await FetchApi({ url: "/article" });
        setArticles(data.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container my-20">
      <p className="text-3xl font-medium">Articles</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {articles.map((item) => (
          <Link key={item._id} href={`/articles/${item?._id}`} className="mb-2">
            <div className="p-5 border border-[#EBEBEB] shadow-medium h-full">
              <Image
                src={ImgUrl + item?.thumbnail}
                width={363}
                height={180}
                alt=""
                className="w-full coverImage"
              />
              <div className="flex justify-between py-3">
                <ArticleStatus />
                <p>{item?.categories?.[0]?.name}</p>
              </div>
              <p className="text-xl font-semibold leading-tight">{item?.title}</p>
              <p className="text-sm text-gray-400">{timeAgo(item?.createdAt)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
