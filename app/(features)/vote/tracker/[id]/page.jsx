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
import ShareButtons from "@/components/common/ShareButtons";

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

const VoteTrackerPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { auth } = useAuth();
  const initialOption = useSearchParams().get("option");
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false); 
  const [showLoginScreen, setShowLoginScreen] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [trackers, setTrackers] = useState([]);
  const [currentTracker, setCurrentTracker] = useState({});
  const [result, setResult] = useState([]);
  const [selectedOption, setSelectedOption] = useState(initialOption);
  const [isAlreadyVoted, setIsAlreadyVoted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); 

        const requests = [FetchApi({ url: "/tracker" })];
        if (auth?._id) {
          requests.push(FetchApi({ url: `/tracker/checkVote/${id}` }));
        }

        const responses = await Promise.all(requests);
        const trackersResponse = responses[0];
        const checkVoteResponse = responses[1];

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

        if (checkVoteResponse?.data?.data) {
          setIsAlreadyVoted(true);
          setSelectedOption(checkVoteResponse.data.data.option);
        }
        setResult(calculateResults(tracker.options));
      } catch (error) {
        console.error("Error fetching data:", error); 
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, auth?._id]);

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    setResult(calculateResults(currentTracker.options, optionId)); 
  };

  const handleSubmit = async () => {
 

    if (!auth?._id) {
      sessionStorage.setItem(
        "voteRedirectUrl",
        `/vote/tracker/${id}?option=${selectedOption}`
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
      setIsAlreadyVoted(true);
      setShowSuccessScreen(true);
    } catch (error) {
      console.error("Error submitting vote:", error); 
    } finally {
      setSubmitLoading(false);
    }
  };

  if (showLoginScreen) {
    return (
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
    );
  }

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
        options={trackers?.map((item) => ({
          name: item.topic,
          value: item._id,
        }))}
        onChange={(e) => router.push("/vote/tracker/" + e.target.value)}
      />

      <div className="bg-white p-8 rounded-lg mt-5"> 
        {loading ? (
          <div className="min-h-[300px] flex items-center justify-center h-full">
            <Loading />
          </div>
        ) : (
          <>
            {showSuccessScreen ? (
              <div className="bg-white p-8 py-12 rounded-lg mt-5 flex flex-col items-center justify-center min-h-[300px]">
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
                <Button variant="secondary" onClick={() => router.push("/")}>
                  Back to Home
                </Button>
              </div>
            ) : (
              <>
                <div className="py-3 border-y">
                  <p className="font-medium text-xl">{currentTracker?.topic}</p>
                </div>

                <div className="lg:m-3 space-y-5 pt-5" role="radiogroup">
                  {currentTracker?.options?.map((item) => {
                    const resultItem = result.find((r) => r._id === item._id);
                    return (
                      <div key={item._id} className="w-full space-y-1">
                        <div className="flex justify-between items-center">
                          <CheckInput
                            boxClassName="!outline-primary"
                            label={item.content}
                            value={selectedOption === item._id}
                            setValue={() => handleOptionSelect(item._id)}
                          />
                          {resultItem && <p>{resultItem.percentage}%</p>}
                        </div>
                        {resultItem && (
                          <ProgressBar progress={resultItem.percentage} />
                        )}
                      </div>
                    );
                  })}
                </div>

                {!isAlreadyVoted && (
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
                  <ShareButtons/>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VoteTrackerPage;
