"use client";
import { FetchApi } from "@/utils/FetchApi";
import React, { useEffect, useState } from "react";

const page = () => {
  const [content, setcontent] = useState("");
  const [title, settitle] = useState("");
  useEffect(() => {
    const loadData = async () => {
      const { data } = await FetchApi({ url: "/static-page/page/about-us" });
      setcontent(data?.data?.content);
      settitle(data?.data?.title);
    };
    loadData();
  }, []);

  return (
    <div className="container">
      <div className="max-w-[846px] mx-auto py-20">
        <p className="text-4xl mb-5 font-semibold">{title}</p>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="text-editor-styles"
        ></div>
      </div>
    </div>
  );
};

export default page;
