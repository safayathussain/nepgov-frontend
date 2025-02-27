"use client"

import { useCallback, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Loading from "@/components/common/Loading"
import CheckInput from "@/components/input/CheckInput"
import SurveyReportChart from "@/components/pages/report/SurveyReportChart"
import { FetchApi } from "@/utils/FetchApi"
import { useAuth } from "@/utils/functions"

const Page = () => {
  const { id } = useParams()
  const [chartData, setChartData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOption, setSelectedOption] = useState({})
  const { auth } = useAuth()
  const [loadingGraphId, setLoadingGraphId] = useState(null)

  const fetchInitialData = useCallback(async () => {
    try {
      setIsLoading(true)
      const { data } = await FetchApi({ url: `/survey/result/${id}` })

      if (auth._id) {
        const { data: checkVote } = await FetchApi({ url: `/survey/checkVote/${id}` })
        setSelectedOption(checkVote?.data || {})
      }

      setChartData(data?.data || [])
    } catch (err) {
      console.error("Error fetching initial data:", err)
    } finally {
      setIsLoading(false)
    }
  }, [id, auth._id])

  useEffect(() => {
    fetchInitialData()
  }, [fetchInitialData])

  const handleFilterChange = useCallback(
    async (questionId, filters) => {
      try {
        setLoadingGraphId(questionId)
        const queryString = new URLSearchParams(filters).toString()
        const { data } = await FetchApi({
          url: `/survey/result/${id}/${questionId}?${queryString}`,
        })
        setChartData((prevData) => prevData.map((item) => (item._id === questionId ? data?.data : item)))
      } catch (err) {
        console.error("Error fetching filtered data:", err)
      } finally {
        setLoadingGraphId(null)
      }
    },
    [],
  )

  if (isLoading) {
    return (
      <div className="min-h-screen flex h-full w-full items-center justify-center">
        <Loading />
      </div>
    )
  }

  return (
    <div className="container">
      <style jsx global>{`
        .p-highlight > .p-checkbox-box {
          background-color: #3560AD !important;
          border-radius: 999px !important; 
        }
        .p-dropdown-item {
          white-space: normal !important;
          max-width: 690px;
          font-size: 14px;
        }
        @media (max-width: 768px) {
          .p-dropdown-panel {
            margin: 5px;
          }
        }
          
      `}</style>
      {chartData?.map((item, index) => (
        <div key={item._id} className="container border-2 border-lightGray rounded-xl py-10 my-10">
          <p className="text-center bg-[#EF4634] text-white w-max px-2 mx-auto">Question {index + 1}</p>
          <p className="text-center text-xl sm:text-2xl font-semibold max-w-[700px] mx-auto pt-2">{item?.topic}</p>
          <div className="py-10 max-w-[700px] mx-auto space-y-2">
            {item?.options?.map((option) => (
              <div
                key={option._id}
                className="bg-[#F3F4F6] p-4 rounded-lg flex justify-between items-center flex-wrap flex-col gap-2 md:flex-row"
              >
                <div>
                  <CheckInput
                    checked={option?._id === selectedOption[item._id]}
                    boxClassName="!outline-primary"
                    label={option?.content}
                  />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-[150px] md:w-[300px] h-1 bg-gray-200 relative">
                    <div className="h-1 bg-primary" style={{ width: `${option?.percentage}%` }} />
                  </div>
                  <span>{option?.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
          <SurveyReportChart
            loadingGraphId={loadingGraphId}
            chartData={item}
            onFilterChange={(filters) => handleFilterChange(item._id, filters)}
          />
        </div>
      ))}
    </div>
  )
}

export default Page

