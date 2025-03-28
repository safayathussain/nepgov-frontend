import React from "react";
import TrackerReportChart from "./TrackerReportChart";

const TrackerChartPdfTamplate = ({ data, ref }) => {
  return (
    <div ref={ref}>
      <div>
        <p>Hi</p>
        <TrackerReportChart chartData={data} liveStartedAt={data?.liveStartedAt} liveEndedAt={data?.liveEndedAt}/>
      </div>
    </div>
  );
};

export default TrackerChartPdfTamplate;
