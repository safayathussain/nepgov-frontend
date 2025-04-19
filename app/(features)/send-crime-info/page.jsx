"use client";

import Button from "@/components/input/Button";
import CrimeExtraInfo from "@/components/pages/crime/CrimeExtraInfo";
import CrimeInfoNavigation from "@/components/pages/crime/CrimeInfoNavigation";
import CrimeOrIncident from "@/components/pages/crime/CrimeOrIncident";
import CrimePersonInfo from "@/components/pages/crime/CrimePersonInfo";
import CrimeType from "@/components/pages/crime/CrimeType";
import { FetchApi } from "@/utils/FetchApi";
import React, { useState, useEffect } from "react";

const CrimeReportForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    crimeType: null,
    location: "",
    additionalLocationDetails: "",
    dateKnown: true,
    time: null,
    crimeDetails: "",
    personDetails: "",
    personAppearance: "",
    personContact: "",
    hasVehicle: null,
    hasWeapon: null,
    confirmNoPoliceAttention: false,
  });
  const [crimeOptions, setCrimeOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrimeTypes = async () => {
      setLoading(true);
      try {
        const response = await FetchApi({ url: "/crime/types" });
        if (response?.data?.success) {
          const options = response.data.data.map((item) => ({
            name: item.type,
            value: item._id,  
          }));
          setCrimeOptions(options);
        }
      } catch (err) {
        console.error("Failed to fetch crime types:", err);
      }
      setLoading(false);
    };

    fetchCrimeTypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      crimeType: formData.crimeType,
      location: formData.location,
      additionalLocationDetails: formData.additionalLocationDetails,
      time: formData?.dateKnown ? formData.time : "",
      crimeDetails: formData.crimeDetails,
      personDetails: formData.personDetails,
      personAppearance: formData.personAppearance,
      personContact: formData.personContact,
      hasVehicle: formData.hasVehicle,
      hasWeapon: formData.hasWeapon,
    };
    await FetchApi({
      url: `/crime/create`,
      method: "post",
      data: requestBody,
      isToast: true,
      callback: () => setStep(5),
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <style>
        {`
          .p-highlight > .p-checkbox-box {
            background-color: #EF4634 !important;
            border-radius: 999px !important;
          }
        `}
      </style>
      {step !== 5 && step !== 1 && <CrimeInfoNavigation index={step} />}
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <CrimeType
            formData={formData}
            setFormData={setFormData}
            crimeOptions={crimeOptions}
            handleBack={handleBack}
            handleNext={handleNext}
            loading={loading}
          />
        )}

        {step === 2 && (
          <CrimeOrIncident
            handleDateChange={handleDateChange}
            formData={formData}
            handleBack={handleBack}
            handleNext={handleNext}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
          />
        )}

        {step === 3 && (
          <CrimePersonInfo
            formData={formData}
            handleBack={handleBack}
            handleNext={handleNext}
            handleInputChange={handleInputChange}
          />
        )}

        {step === 4 && (
          <CrimeExtraInfo
            formData={formData}
            setFormData={setFormData}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        )}

        {step === 5 && (
          <div className="space-y-4 bg-white p-10">
            <div className="w-12 h-12 bg-primary rounded-lg">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold">Your report was received</h2>
            <p>
              Thanks for your information. We will look into the case and take
              necessary steps as soon as possible.
            </p>
            <Button type="button" onClick={() => (window.location.href = "/")}>
              Back to home
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CrimeReportForm;