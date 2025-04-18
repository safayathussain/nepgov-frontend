"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import { FetchApi } from "@/utils/FetchApi";
import { useParams } from "next/navigation";
import { ImgUrl } from "@/utils/constants";
import { formatReadableDate, timeAgo } from "@/utils/functions";
import Loading from "@/components/common/Loading";
const page = () => {
  const [loading, setloading] = useState(false);
  const [article, setArticle] = useState({});
  const [moreArticles, setMoreArticles] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const loadData = async () => {
      setloading(true);
      const { data } = await FetchApi({ url: `article/${id}` });
      setArticle(data?.data);
      const { data: moreArticlesData } = await FetchApi({
        url: `article?count=4`,
      });
      setMoreArticles(moreArticlesData?.data);
      setloading(false);
    };
    loadData();
  }, []);
  return (
    <div>
      {loading ? (
        <div className="min-h-screen flex h-full w-full items-center justify-center">
          <Loading />
        </div>
      ) : (
        <>
          {article?.thumbnail && (
            <Image
              src={ImgUrl + article?.thumbnail}
              width={1280}
              height={500}
              alt=""
              className="w-full h-[500px] object-cover"
            ></Image>
          )}
          <div className="container max-w-[846px] py-10 ">
            <p className="text-2xl md:text-4xl text-primary font-semibold">
              {article?.title}
            </p>
            <p className="pt-5 font-medium italic text-[#808DA5]">
              published on {formatReadableDate(article?.createdAt)}
            </p>
            <div
              className="text-editor-styles"
              dangerouslySetInnerHTML={{ __html: article?.content }}
            >
              {/* content */}
            </div>
            <div className="mt-16">
              <p className="text-xl md:text-3xl font-semibold">
                Read more
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
                {/* articles */}
                {moreArticles?.map((item) => (
                  <Link
                    key={item?._id}
                    href={`/article/${item?._id}`}
                    className="h-full"
                  >
                    <div className="p-5 border border-[#EBEBEB] shadow-medium h-full">
                      <Image
                        src={ImgUrl + item?.thumbnail}
                        width={363}
                        height={180}
                        alt=""
                        className="w-full coverImage"
                      ></Image>
                      <div className="flex justify-between py-3">
                        <p>{item?.categories?.[0]?.name}</p>
                      </div>
                      <p className="text-xl font-semibold leading-tight">
                        {item?.title}
                      </p>
                      <p className="text-sm mt-2 text-gray-400">
                        {timeAgo(item?.createdAt)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
