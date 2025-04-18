"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/common/Loading";
import ProgressBar from "@/components/common/ProgressBar";
import Button from "@/components/input/Button";
import CheckInput from "@/components/input/CheckInput";
import DropdownInput from "@/components/input/DropdownInput";
import { FetchApi } from "@/utils/FetchApi";
import { isScheduled, useAuth } from "@/utils/functions";
import { motion, AnimatePresence } from "framer-motion";

const calculateResults = (options) => {
  const totalVotes = options.reduce((sum, item) => sum + item.votedCount, 0);
  return options.map((item) => ({
    ...item,
    percentage:
      totalVotes > 0 ? ((item.votedCount / totalVotes) * 100).toFixed(0) : 0,
  }));
};

const SurveyFlow = () => {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLoginScreen, setShowLoginScreen] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [surveys, setSurveys] = useState([]);
  const [currentSurvey, setCurrentSurvey] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isModifyingPrevious, setIsModifyingPrevious] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const requests = [FetchApi({ url: "/survey" })];
        if (auth?._id) {
          requests.push(FetchApi({ url: `/survey/checkVote/${id}` }));
        }

        const responses = await Promise.all(requests);
        const surveysResponse = responses[0];
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

        const options =
          Object.keys(responses[1]?.data?.data || {})?.length !== 0
            ? Object.entries(responses[1]?.data?.data)?.map(
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
        const answeredQuestions = survey.questions.filter(
          (q) => initialOptions[q._id]
        );
        if (Object.keys((await responses[1]?.data?.data) || {}).length === 0) {
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
        setCurrentQuestionIndex(answeredQuestions.length);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to load survey data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, searchParams, auth?._id]);

  const handleOptionSelect = async (
    questionId,
    optionId,
    isPrevious = false
  ) => {
    if (isPrevious) {
      setIsModifyingPrevious(true);
    }

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
      if (isPrevious) {
        // Update an already answered question
        setAnsweredQuestions((prev) =>
          prev.map((q) =>
            q._id === questionId
              ? {
                  ...q,
                  selectedOption: optionId,
                  results: calculateResults(q.options, optionId),
                }
              : q
          )
        );
        setIsModifyingPrevious(false);
      } else {
        // Process a new answer
        const results = calculateResults(currentQuestion.options, optionId);

        // Only add if not already answered
        if (!answeredQuestions.some((q) => q._id === currentQuestion._id)) {
          setAnsweredQuestions((prev) => [
            {
              ...currentQuestion,
              results: results,
              selectedOption: optionId,
            },
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
      const redirectUrl = `/vote/survey/${id}?${optionsQuery}`;
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

      setShowSuccessScreen(true);
    } catch (error) {
      console.error("Error submitting votes:", error);
      setError(error.message || "Failed to submit votes");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex h-full w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (showLoginScreen) {
    return (
      <div className="bg-white p-8 rounded-lg mt-5">
        <p className="text-2xl font-semibold">
          Please log in to submit your answers
        </p>
        <p>Your response will be saved after logging in.</p>
        <div className="flex items-center gap-2 mt-5">
          <Button onClick={() => router.push("/login")}>Log in</Button>
          <Button onClick={() => router.push("/signup")}>Signup</Button>
        </div>
      </div>
    );
  }

  const currentQuestion = currentSurvey.questions?.[currentQuestionIndex];
  const isLastQuestion =
    currentQuestionIndex === currentSurvey.questions?.length - 1;
  return (
    <div>
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

      <DropdownInput
        placeholder="Change topic"
        filter
        options={surveys?.map((item) => ({
          name: item.topic,
          value: item._id,
        }))}
        onChange={(e) => router.push("/vote/survey/" + e.target.value)}
      />
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
            <div className="bg-white p-8 mt-5 rounded-lg ">
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
                              option._id ||
                            answeredQuestions[currentQuestion._id] ===
                              option._id
                          }
                          setValue={() =>
                            handleOptionSelect(currentQuestion._id, option._id)
                          }
                        />
                      ))}
                    </div>

                    {isLastQuestion && selectedOptions[currentQuestion._id] && (
                      <div className="flex justify-end mt-6">
                        <Button onClick={handleSubmit} disabled={submitLoading}>
                          {submitLoading ? "Submitting..." : "Submit All"}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </>
      )}

      {/* Previous Questions Results Section */}
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
                  ease: [0.25, 0.1, 0.25, 1], // ease-in-out
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
                <p className="font-medium text-lg mb-4">{question.question}</p>
                <div className="space-y-4">
                  {question.results.map((option) => (
                    <div key={option._id} className="w-full">
                      <div className="flex justify-between items-center mb-2">
                        <span className="flex items-center w-full">
                          <CheckInput
                            boxClassName="!outline-primary"
                            checked={question.selectedOption === option._id}
                            onChange={() =>
                              handleOptionSelect(question._id, option._id, true)
                            }
                          />
                          <span className="ml-2 flex-1">{option.content}</span>
                        </span>
                        <span className="ml-4">{option.percentage}%</span>
                      </div>
                      <ProgressBar progress={option.percentage} />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default SurveyFlow;
