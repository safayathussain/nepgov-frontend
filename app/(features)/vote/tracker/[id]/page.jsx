"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/common/Loading";
import ProgressBar from "@/components/common/ProgressBar";
import Button from "@/components/input/Button";
import CheckInput from "@/components/input/CheckInput";
import DropdownInput from "@/components/input/DropdownInput";
import { FetchApi } from "@/utils/FetchApi";
import { useAuth } from "@/utils/functions";

const calculateResults = (options) => {
  const totalVotes = options.reduce((sum, item) => sum + item.votedCount, 0);
  return options.map((item) => ({
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
  const [error, setError] = useState(null);
  const [showLoginScreen, setShowLoginScreen] = useState(false);
  const [trackers, setTrackers] = useState([]);
  const [currentTracker, setCurrentTracker] = useState({});
  const [result, setResult] = useState([]);
  const [selectedOption, setSelectedOption] = useState(initialOption);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Only fetch checkVote if user is authenticated
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

        setTrackers(trackersResponse.data.data);
        setCurrentTracker(tracker);

        if (checkVoteResponse?.data?.data) {
          setSelectedOption(checkVoteResponse.data.data.option);
          setResult(calculateResults(tracker.options));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to load voting data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, auth?._id]);

  const handleSubmit = async () => {
    if (!selectedOption) {
      setError("Please select an option before submitting");
      return;
    }

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
      setError(null);

      const { data } = await FetchApi({
        url: `tracker/${id}/vote`,
        data: { optionId: selectedOption },
        method: "post",
        isToast: true,
      });

      setResult(calculateResults(data.data.options));
    } catch (error) {
      console.error("Error submitting vote:", error);
      setError(error.message || "Failed to submit vote");
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

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-8 rounded-lg mt-5">
        <p className="text-red-600">{error}</p>
        <Button onClick={() => router.refresh()} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  if (showLoginScreen) {
    return (
      <div className="bg-white p-8 rounded-lg mt-5">
        <p className="text-2xl font-semibold">Please log in to submit your answers</p>
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

      <div
        className="bg-white p-8 rounded-lg mt-5"
        role="main"
        aria-label="Voting tracker"
      >
        <div className="py-2 border-y">
          <p className="font-medium">{currentTracker?.topic}</p>
        </div>

        {!result.length ? (
          <>
            <div
              className="lg:m-3 space-y-5 pt-5"
              role="radiogroup"
              aria-label="Voting options"
            >
              {currentTracker?.options?.map((item) => (
                <CheckInput
                  key={item._id}
                  boxClassName="!outline-primary"
                  label={item.content}
                  value={item._id}
                  setValue={() => setSelectedOption(item._id)}
                  checked={selectedOption === item._id}
                  aria-label={item.content}
                />
              ))}
            </div>
            <div className="flex justify-end mt-5">
              <Button
                onClick={handleSubmit}
                disabled={submitLoading || !selectedOption}
                aria-busy={submitLoading}
              >
                {submitLoading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </>
        ) : (
          <div
            className="lg:m-3 space-y-5 pt-5 w-full"
            role="region"
            aria-label="Voting results"
          >
            {result.map((item) => (
              <div key={item._id} className="flex items-center">
                <CheckInput
                  boxClassName="!outline-primary"
                  checked={selectedOption === item._id}
                  readOnly
                />
                <div className="w-full">
                  <div className="flex justify-between w-full">
                    <p>{item.content}</p>
                    <p aria-label={`${item.percentage}% of votes`}>
                      {item.percentage}%
                    </p>
                  </div>
                  <div>
                    <ProgressBar
                      progress={item.percentage}
                      aria-valuenow={item.percentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoteTrackerPage;
