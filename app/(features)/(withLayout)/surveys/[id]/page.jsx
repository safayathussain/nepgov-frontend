"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/common/Loading";
import ProgressBar from "@/components/common/ProgressBar";
import Button from "@/components/input/Button";
import CheckInput from "@/components/input/CheckInput";
import DropdownInput from "@/components/input/DropdownInput";
import SurveyReportChart from "@/components/pages/report/SurveyReportChart";
import ShareButtons from "@/components/common/ShareButtons";
import { FetchApi } from "@/utils/FetchApi";
import { isScheduled, useAuth } from "@/utils/functions";
import { motion, AnimatePresence } from "framer-motion";

const calculateResults = (options, selectedOptionId = null) => {
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

const SurveyPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(null); // Tracks loading questionId for charts
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLoginScreen, setShowLoginScreen] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [surveys, setSurveys] = useState([]);
  const [currentSurvey, setCurrentSurvey] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isAlreadyVoted, setIsAlreadyVoted] = useState(false);
  const [isTrackerLive, setIsTrackerLive] = useState(false);
  const [chartData, setChartData] = useState([]);

  const fetchSurveyData = useCallback(
    async (fetchAll = true, questionId = null, filters = {}) => {
      try {
        if (fetchAll) {
          setLoading(true);
        } else {
          setChartLoading(questionId);
        }
        const requests = [];
        if (fetchAll) {
          requests.push(FetchApi({ url: "/survey" }));
          if (auth?._id) {
            requests.push(FetchApi({ url: `/survey/checkVote/${id}` }));
          }
        }
        if (!fetchAll && questionId) {
          const queryString = new URLSearchParams(filters).toString();
          requests.push(
            FetchApi({
              url: `/survey/result/${id}/${questionId}?${queryString}`,
            })
          );
        } else {
          requests.push(FetchApi({ url: `/survey/result/${id}` }));
        }

        const responses = await Promise.all(requests);
        let surveysResponse, checkVoteResponse, resultResponse;

        if (fetchAll) {
          surveysResponse = responses[0];
          checkVoteResponse = auth?._id ? responses[1] : null;
          resultResponse = responses[auth?._id ? 2 : 1];
        } else {
          resultResponse = responses[0];
        }

        if (fetchAll) {
          const survey = surveysResponse.data.data.find(
            (item) => item._id === id
          );
          if (!survey) {
            throw new Error("Survey not found");
          }

          setSurveys(
            surveysResponse.data.data.filter(
              (item) => !isScheduled(item.liveStartedAt)
            )
          );
          setCurrentSurvey(survey);
          setIsTrackerLive(
            !isScheduled(survey.liveStartedAt) &&
              new Date(survey.liveEndedAt) > new Date()
          );

          const options =
            Object.keys(checkVoteResponse?.data?.data || {}).length !== 0
              ? Object.entries(checkVoteResponse?.data?.data).map(
                  ([key, value]) => `${key}:${value}`
                )
              : searchParams.getAll("options");
          const initialOptions = {};
          options.forEach((option) => {
            const [questionId, optionId] = option.split(":");
            if (questionId && optionId) {
              initialOptions[questionId] = optionId;
            }
          });
          setSelectedOptions(initialOptions);

          if (checkVoteResponse?.data?.data) {
            setIsAlreadyVoted(
              Object.keys(checkVoteResponse.data.data).length > 0
            );
          }

          const answeredQuestions = survey.questions.filter(
            (q) => initialOptions[q._id]
          );
          if (
            Object.keys(checkVoteResponse?.data?.data || {}).length !== 0 &&
            options.length > 0 &&
            !searchParams.getAll("options").length
          ) {
            answeredQuestions.pop();
          }
          answeredQuestions.reverse();
          setAnsweredQuestions(
            answeredQuestions.map((q) => ({
              ...q,
              selectedOption: initialOptions[q._id],
              results: calculateResults(q.options, initialOptions[q._id]),
            }))
          );

          const nextQuestionIndex =
            answeredQuestions.length < survey.questions.length
              ? answeredQuestions.length
              : survey.questions.length - 1;
          setCurrentQuestionIndex(nextQuestionIndex);
        }

        if (fetchAll) {
          setChartData(resultResponse.data?.data || []);
        } else {
          setChartData((prevData) =>
            prevData.map((item) =>
              item._id === questionId ? resultResponse.data?.data : item
            )
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to load survey data");
      } finally {
        if (fetchAll) {
          setLoading(false);
        } else {
          setChartLoading(null);
        }
      }
    },
    [id, auth?._id, searchParams]
  );

  useEffect(() => {
    if (id) {
      fetchSurveyData(true);
    }
  }, [id, fetchSurveyData]);

  const handleOptionSelect = async (
    questionId,
    optionId,
    isPrevious = false
  ) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));

    try {
      const currentQuestion = isPrevious
        ? answeredQuestions.find((q) => q._id === questionId)
        : currentSurvey.questions?.[currentQuestionIndex];

      if (!currentQuestion) {
        return;
      }

      const results = calculateResults(currentQuestion.options, optionId);

      if (isPrevious) {
        setAnsweredQuestions((prev) =>
          prev.map((q) =>
            q._id === questionId
              ? { ...q, selectedOption: optionId, results }
              : q
          )
        );
      } else {
        const isAlreadyAnswered = answeredQuestions.some(
          (q) => q._id === currentQuestion._id
        );

        if (isAlreadyAnswered) {
          setAnsweredQuestions((prev) =>
            prev.map((q) =>
              q._id === currentQuestion._id
                ? { ...q, selectedOption: optionId, results }
                : q
            )
          );
        } else {
          setAnsweredQuestions((prev) => [
            { ...currentQuestion, results, selectedOption: optionId },
            ...prev,
          ]);

          if (currentQuestionIndex < currentSurvey.questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
          }
        }
      }
      setError(null);
    } catch (error) {
      console.error("Error processing question:", error);
      setError("Failed to process question");
    }
  };

  const handleSubmit = async () => {
    if (!auth?._id) {
      const optionsQuery = Object.entries(selectedOptions)
        .map(([questionId, optionId]) => `options=${questionId}:${optionId}`)
        .join("&");
      const redirectUrl = `/surveys/${id}?${optionsQuery}`;
      sessionStorage.setItem("voteRedirectUrl", redirectUrl);
      setShowLoginScreen(true);
      return;
    }

    try {
      setSubmitLoading(true);
      setError(null);
      const votes = Object.entries(selectedOptions).map(
        ([questionId, optionId]) => ({
          questionId,
          optionId,
        })
      );
      await FetchApi({
        url: `/survey/${id}/vote`,
        method: "post",
        data: { votes },
        isToast: true,
      });

      setIsAlreadyVoted(true);
      setShowSuccessScreen(true);
    } catch (error) {
      console.error("Error submitting votes:", error);
      setError(error.message || "Failed to submit votes");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleFilterChange = useCallback(
    async (questionId, filters) => {
      await fetchSurveyData(false, questionId, filters);
    },
    [fetchSurveyData]
  );

  const shouldShowVoteScreen =
    !isAlreadyVoted && isTrackerLive && !showSuccessScreen;
  const currentQuestion = currentSurvey.questions?.[currentQuestionIndex];
  const isLastQuestion =
    currentQuestionIndex === currentSurvey.questions?.length - 1;

  if (showLoginScreen) {
    return (
      <div className="max-w-[835px] container">
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
        <div className="bg-white p-8 rounded-lg mt-5">
          <p className="text-2xl font-semibold">
            Please log in to submit your answers
          </p>
          <p>Your responses will be saved after logging in.</p>
          <div className="flex items-center gap-2 mt-5">
            <Button onClick={() => router.push("/login")}>Log in</Button>
            <Button onClick={() => router.push("/signup")}>Signup</Button>
          </div>
        </div>
      </div>
    );
  }

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
      <div className="max-w-[835px] container">
        <DropdownInput
          placeholder="Change topic"
          filter
          options={surveys?.map((item) => ({
            name: item.topic,
            value: item._id,
          }))}
          onChange={(e) => router.push("/surveys/" + e.target.value)}
        />
      </div>

      {loading ? (
        <div className="min-h-[80vh] flex h-full w-full items-center justify-center">
          <Loading />
        </div>
      ) : shouldShowVoteScreen ? (
        <div className="max-w-[835px] container">
          {showSuccessScreen ? (
            <div className="bg-white p-8 py-20 rounded-lg mt-5 flex flex-col items-center justify-center min-h-[300px]">
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
              <p className="text-gray-600 mb-6 text-center">
                Your response was stored successfully in NepGov.
              </p>
              <Button variant="secondary" onClick={() => router.push("/")}>
                Back to Home
              </Button>
            </div>
          ) : (
            <>
              {currentQuestion && (
                <div className="bg-white p-8 mt-5 rounded-lg">
                  <motion.div
                    key={currentQuestion._id}
                    initial={{ height: 0, opacity: 1 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-1 overflow-y-hidden"
                  >
                    <div className="">
                      <div className="border-y mb-5">
                        <p className="py-3 font-medium text-xl">
                          {currentSurvey?.topic}
                        </p>
                      </div>
                      <div className="">
                        <p className="font-medium mb-4 bg-[#808DA5] text-white px-2 w-min whitespace-nowrap">
                          Question {currentQuestionIndex + 1}
                        </p>
                        <p className="font-medium mb-4 text-lg">
                          {currentQuestion?.question}
                        </p>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <div className="space-y-4">
                          {currentQuestion?.options?.map((option) => (
                            <CheckInput
                              key={option._id}
                              boxClassName="!outline-primary"
                              label={option.content}
                              value={
                                selectedOptions[currentQuestion._id] ===
                                option._id
                              }
                              setValue={() =>
                                handleOptionSelect(
                                  currentQuestion._id,
                                  option._id
                                )
                              }
                            />
                          ))}
                        </div>
                        {isLastQuestion &&
                          selectedOptions[currentQuestion._id] && (
                            <div className="flex justify-end mt-6">
                              <Button
                                onClick={handleSubmit}
                                disabled={submitLoading}
                              >
                                {submitLoading ? "Submitting..." : "Submit All"}
                              </Button>
                            </div>
                          )}
                      </div>
                      <div className="flex items-center justify-end gap-3 mt-5">
                        <p>Share with:</p>
                        <ShareButtons />
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
              {answeredQuestions.length > 0 && (
                <div className="space-y-5 mt-5">
                  <AnimatePresence>
                    {answeredQuestions.map((question, index) => (
                      <motion.div
                        key={question._id}
                        initial={{ y: -100, opacity: 1 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.6,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="bg-white p-8 rounded-lg"
                      >
                        <div className="border-y mb-5">
                          <p className="py-3 font-medium text-xl">
                            {currentSurvey?.topic}
                          </p>
                        </div>
                        <p className="font-medium mb-4 bg-[#808DA5] text-white px-2 w-min whitespace-nowrap">
                          Question {answeredQuestions.length - index}
                        </p>
                        <p className="font-medium text-lg mb-4">
                          {question.question}
                        </p>
                        <div className="space-y-4">
                          {question.results.map((option) => (
                            <div key={option._id} className="w-full">
                              <div className="flex justify-between items-center mb-2">
                                <span className="flex items-center w-full">
                                  <CheckInput
                                    boxClassName="!outline-primary"
                                    checked={
                                      question.selectedOption === option._id
                                    }
                                    onChange={() =>
                                      handleOptionSelect(
                                        question._id,
                                        option._id,
                                        true
                                      )
                                    }
                                  />
                                  <span className="ml-2 flex-1">
                                    {option.content}
                                  </span>
                                </span>
                                <span className="ml-4">
                                  {option.percentage}%
                                </span>
                              </div>
                              <ProgressBar progress={option.percentage} />
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-end gap-3 mt-5">
                          <p>Share with:</p>
                          <ShareButtons />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="container">
          <p className="text-3xl  font-semibold text-center mt-10 text-white">
            {chartData?.[0]?.topic}
          </p>
          {chartData?.map((item, index) => (
            <div
              id={item?._id}
              key={item._id}
              className="container bg-white  rounded-xl py-10 my-10"
            >
              <p className="text-center bg-[#EF4634] text-white w-max px-2 mx-auto">
                Question {index + 1}
              </p>
              <p className="text-center text-xl sm:text-2xl font-semibold max-w-[700px] mx-auto pt-2">
                {item?.question}
              </p>
              <div className="py-10 max-w-[700px] mx-auto space-y-2">
                {item?.options?.map((option) => (
                  <div
                    key={option._id}
                    className="bg-[#F3F4F6] p-4 rounded-lg flex justify-between items-center flex-wrap flex-col gap-2 md:flex-row"
                  >
                    <div>
                      <CheckInput
                        checked={option?._id === selectedOptions[item._id]}
                        boxClassName="!outline-primary"
                        label={option?.content}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-[150px] md:w-[300px] h-1 bg-gray-200 relative">
                        <div
                          className="h-1 bg-primary"
                          style={{ width: `${option?.percentage}%` }}
                        />
                      </div>
                      <span className="w-9">{option?.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <SurveyReportChart
                id={item._id}
                loadingGraphId={chartLoading}
                chartData={item}
                onFilterChange={(filters) =>
                  handleFilterChange(item._id, filters)
                }
                liveEndedAt={item?.liveEndedAt}
                liveStartedAt={item?.liveStartedAt}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurveyPage;
