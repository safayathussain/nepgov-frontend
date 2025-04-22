"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/common/Loading";
import ProgressBar from "@/components/common/ProgressBar";
import Button from "@/components/input/Button";
import CheckInput from "@/components/input/CheckInput";
import DropdownInput from "@/components/input/DropdownInput";
import TrackerReportChart from "@/components/pages/report/TrackerReportChart";
import ShareButtons from "@/components/common/ShareButtons";
import { FetchApi } from "@/utils/FetchApi";
import { isScheduled, useAuth } from "@/utils/functions";
import { motion, AnimatePresence } from "framer-motion";

const calculateResults = (options) => {
  const updatedOptions = options.map((item) => ({
    ...item,
    votedCount: item.votedCount || 0,
  }));

  const totalVotes = updatedOptions.reduce(
    (sum, item) => sum + item.votedCount,
    0
  );
  return updatedOptions.map((item) => ({
    ...item,
    percentage:
      totalVotes > 0 ? ((item.votedCount / totalVotes) * 100).toFixed(0) : 0,
  }));
};

const TrackerPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const { auth } = useAuth();
  const initialOption = searchParams.get("option");
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showLoginScreen, setShowLoginScreen] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [trackers, setTrackers] = useState([]);
  const [currentTracker, setCurrentTracker] = useState({});
  const [result, setResult] = useState([]);
  const [selectedOption, setSelectedOption] = useState(initialOption);
  const [isAlreadyVoted, setIsAlreadyVoted] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [isTrackerLive, setIsTrackerLive] = useState(false);

  const [filters, setFilters] = useState({
    age: searchParams.get("age") || "0-100",
    gender: searchParams.get("gender") || "",
    monthDuration: searchParams.get("monthDuration") || "",
    country: searchParams.get("country") || "",
    state_province: searchParams.get("state_province") || "",
    city: searchParams.get("city") || "",
  });

  const fetchTrackerData = useCallback(
    async (localFilters = filters, fetchAll = true) => {
      try {
        if (fetchAll) {
          setLoading(true);
        } else {
          setChartLoading(true);
        }
        const requests = [];
        if (fetchAll) {
          requests.push(FetchApi({ url: "/tracker" }));
          if (auth?._id) {
            requests.push(FetchApi({ url: `/tracker/checkVote/${id}` }));
          }
        }
        const queryString = new URLSearchParams(localFilters).toString();
        requests.push(
          FetchApi({ url: `/tracker/result/${id}?${queryString}` })
        );

        const responses = await Promise.all(requests);
        let trackersResponse, checkVoteResponse, resultResponse;

        if (fetchAll) {
          trackersResponse = responses[0];
          checkVoteResponse = auth?._id ? responses[1] : null;
          resultResponse = responses[auth?._id ? 2 : 1];
        } else {
          resultResponse = responses[0];
        }

        if (fetchAll) {
          const tracker = trackersResponse.data.data.find(
            (item) => item._id === id
          );
          if (!tracker) {
            throw new Error("Tracker not found");
          }

          setTrackers(
            trackersResponse.data.data.filter(
              (item) => !isScheduled(item.liveStartedAt)
            )
          );
          setCurrentTracker(tracker);
          if (!tracker.liveEndedAt) {
            setIsTrackerLive(true);
          } else {
            setIsTrackerLive(
              !isScheduled(tracker.liveStartedAt) &&
                new Date(tracker.liveEndedAt) > new Date()
            );
          }

          if (checkVoteResponse?.data?.data) {
            setIsAlreadyVoted(true);
            setSelectedOption(checkVoteResponse.data.data.option);
          }

          setResult(calculateResults(tracker.options));
        }

        setChartData(resultResponse.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (fetchAll) {
          setLoading(false);
        } else {
          setChartLoading(false);
        }
      }
    },
    [id, auth?._id, filters]
  );

  useEffect(() => {
    if (id) {
      fetchTrackerData(filters, true);
    }
  }, [id, fetchTrackerData]);

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    setResult(calculateResults(currentTracker.options));
  };

  const handleSubmit = async () => {
    if (!auth?._id) {
      sessionStorage.setItem(
        "voteRedirectUrl",
        `/trackers/${id}?option=${selectedOption}`
      );
      setShowLoginScreen(true);
      return;
    }

    try {
      setSubmitLoading(true);
      const { data } = await FetchApi({
        url: `tracker/${id}/vote`,
        data: { optionId: selectedOption },
        method: "post",
        isToast: true,
      });

      setResult(calculateResults(data.data.options));
      setShowSuccessScreen(true);
    } catch (error) {
      console.error("Error submitting vote:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const shouldShowVoteScreen =
    (!isAlreadyVoted && isTrackerLive) || showSuccessScreen;

  return (
    <div className={""}>
      <style jsx global>{`
        .p-dropdown-item {
          white-space: normal !important;
          max-width: 690px;
          font-size: 14px;
        }
        .p-highlight > .p-checkbox-box {
          background-color: #3560ad !important;
          border-radius: 999px !important;
        }
        @media (max-width: 768px) {
          .p-dropdown-panel {
            margin: 5px;
          }
        }
      `}</style>
      <div className={"max-w-[835px] container"}>
        <DropdownInput
          placeholder="Change topic"
          filter
          options={trackers?.map((item) => ({
            name: item.topic,
            value: item._id,
          }))}
          onChange={(e) => router.push("/trackers/" + e.target.value)}
        />
      </div>
      {showLoginScreen && (
        <motion.div
          key={showLoginScreen}
          initial={{ height: 0, opacity: 1 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="p-1 overflow-y-hidden"
        >
          <div className="max-w-[835px] container">
            <div className="bg-white p-8 rounded-lg mt-5">
              <div className="py-3 border-y">
                <p className="font-medium text-xl">
                  Are you already a member of NepGov?
                </p>
              </div>
              <div className="lg:m-3 space-y-5 pt-5" role="radiogroup">
                <div className="w-full space-y-1">
                  <CheckInput
                    boxClassName="!outline-primary"
                    label="Yes"
                    value={false}
                    setValue={() => {
                      sessionStorage.setItem(
                        "voteRedirectUrl",
                        `/trackers/${id}?option=${selectedOption}`
                      );
                      router.push("/login");
                    }}
                  />
                </div>
                <div className="w-full space-y-1">
                  <CheckInput
                    boxClassName="!outline-primary"
                    label="No"
                    value={false}
                    setValue={() => {
                      sessionStorage.setItem(
                        "voteRedirectUrl",
                        `/trackers/${id}?option=${selectedOption}`
                      );
                      router.push("/signup");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      {shouldShowVoteScreen ? (
        <div className="max-w-[835px] container">
          <div className="bg-white p-8 rounded-lg mt-5 ">
            {loading ? (
              <div className="min-h-[300px] flex items-center justify-center h-full">
                <Loading />
              </div>
            ) : (
              <>
                {showSuccessScreen ? (
                  <div className="bg-white p-8 py-12 rounded-lg flex flex-col items-center justify-center min-h-[300px]">
                    <svg
                      width="127"
                      height="127"
                      viewBox="0 0 127 127"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M116.416 63.4999C116.416 34.2748 92.7245 10.5833 63.4997 10.5833C34.2746 10.5833 10.583 34.2748 10.583 63.4999C10.583 92.7247 34.2746 116.417 63.4997 116.417C92.7245 116.417 116.416 92.7247 116.416 63.4999Z"
                        stroke="#0E9F6E"
                        strokeWidth="3.02381"
                      />
                      <path
                        d="M42.333 66.1458L55.5622 79.375L84.6663 47.625"
                        stroke="#0E9F6E"
                        strokeWidth="3.02381"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h2 className="text-2xl font-semibold mb-2 mt-5">
                      Submitted Successfully!
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Your response was stored successfully in NepGov.
                    </p>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="secondary"
                        onClick={() => router.push("/")}
                      >
                        Back to Home
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setShowSuccessScreen(false);
                          setIsAlreadyVoted(true);
                          fetchTrackerData();
                        }}
                      >
                        View Result
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="py-3 border-y">
                      <p className="font-medium text-xl">
                        {currentTracker?.topic}
                      </p>
                    </div>
                    <div className="lg:m-3 space-y-5 pt-5" role="radiogroup">
                      {currentTracker?.options?.map((item) => {
                        const resultItem = result.find(
                          (r) => r._id === item._id
                        );
                        return (
                          <div key={item._id} className="w-full space-y-1">
                            <div className="flex justify-between items-center">
                              <CheckInput
                                boxClassName="!outline-primary"
                                label={item.content}
                                value={selectedOption === item._id}
                                setValue={() => {
                                  console.log(auth);
                                  handleOptionSelect(item._id);
                                  if (!auth._id) {
                                    console.log("HI");
                                    setShowLoginScreen(true);
                                  }
                                }}
                              />
                              {resultItem && selectedOption && (
                                <p>{resultItem.percentage}%</p>
                              )}
                            </div>
                            {resultItem && selectedOption && (
                              <ProgressBar progress={resultItem.percentage} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {!isAlreadyVoted && auth._id && (
                      <div className="flex justify-end mt-5">
                        <Button
                          onClick={handleSubmit}
                          disabled={submitLoading || !selectedOption}
                          aria-busy={submitLoading}
                        >
                          {submitLoading ? "Submitting..." : "Submit"}
                        </Button>
                      </div>
                    )}
                    <div className="flex items-center justify-end gap-3 mt-5">
                      <p>Share with:</p>
                      <ShareButtons />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="">
          {loading ? (
            <div className="min-h-[300px] flex items-center justify-center h-full">
              <Loading />
            </div>
          ) : (
            <div className="container">
              <div className="container border border-[#EBEBEB] bg-white rounded-xl py-10 my-10">
                <p className="text-center text-xl sm:text-2xl lg:text-4xl font-semibold max-w-[700px] mx-auto mt-5">
                  {chartData?.topic}
                </p>
                <div className="py-10 max-w-[700px] mx-auto space-y-2">
                  {chartData?.options?.map((item, i) => (
                    <div
                      key={i}
                      className="bg-[#F3F4F6] p-4 rounded-lg flex justify-between items-center flex-col gap-2 md:flex-row"
                    >
                      <div>
                        <CheckInput
                          checked={item?._id === selectedOption}
                          boxClassName="!outline-primary"
                          label={item?.content}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-[150px] md:w-[300px] h-1 bg-gray-200 relative">
                          <div
                            className="h-1 bg-primary"
                            style={{ width: `${item?.percentage}%` }}
                          />
                        </div>
                        <span className="w-9">{item?.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <TrackerReportChart
                  id={id}
                  chartData={chartData}
                  filters={filters}
                  isLoading={chartLoading}
                  onFilterChange={handleFilterChange}
                  onApplyFilters={() => fetchTrackerData(filters, false)}
                  liveStartedAt={chartData?.liveStartedAt}
                  liveEndedAt={chartData?.liveEndedAt}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackerPage;
