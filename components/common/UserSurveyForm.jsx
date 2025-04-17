"use client";

import React, { useState } from "react";
import DropdownInput from "../input/DropdownInput";
import Button from "../input/Button";

const SurveyForm = ({ onSubmit }) => {
  const [reasonForJoining, setReasonForJoining] = useState("");
  const [politicalParty, setPoliticalParty] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [highestQualification, setHighestQualification] = useState("");
  const [consentCategories, setConsentCategories] = useState("");

  // Options for each dropdown (name = value)
  const reasonForJoiningOptions = [
    "Someone recommended it to me",
    "I saw NepGov mentioned in the media and it looked interesting",
    "I want to earn points and win prizes",
    "I'm interested in the issues NepGov conducts research on",
    "Just curious",
  ].map((option) => ({ name: option, value: option }));

  const politicalPartyOptions = [
    "Nepali Congress (NC)",
    "CPN (UML), CPN (Maoist-centre)",
    "CPN (Unified Socialist)",
    "People’s Socialist Party, Nepal",
    "Loktantrik Samajwadi Party",
    "Nepal and People’s Progressive Party",
    "Prefer not to say",
  ].map((option) => ({ name: option, value: option }));

  const ethnicityOptions = [
    "Brahmin",
    "Chhetri",
    "Madeshi",
    "Newar",
    "Magar",
    "Dalit",
    "Gurung",
    "Rai",
    "Limbu",
    "Tharu",
    "Tamang",
    "Khas",
    "Sarki",
    "Kami",
    "Chepang",
    "Bahun",
    "Sherpa",
    "Thakuri",
    "Muslim",
    "Dhanuk",
    "Badi",
    "Kalwar",
    "Mallah",
    "Kusunda",
    "Paswan",
    "Yolmo",
    "Pulami",
    "Raute",
    "Walung",
    "Kirati",
    "Dhimal",
    "Bhutia",
    "Sunwar",
    "Tibetan",
    "Kham Magar",
    "Other",
    "Muker tribe",
    "Lampuchhwa Tharu",
    "Banjar",
    "Prefer not to say",
  ].map((option) => ({ name: option, value: option }));

  const highestQualificationOptions = [
    "School Leaving Certificate (SLC)",
    "Higher Secondary (e.g. SEN, SRN, SCM, RQM)",
    "Nursing qualification (e.g. SEN, SRN, SCM, RQM)",
    "Teaching qualification (not degree)",
    "University diploma",
    "University or first degree (e.g. BA, BSc, BEd)",
    "University or higher degree (e.g. MSc, PhD)",
    "Other technical, professional or higher qualification",
    "I don’t know",
    "Prefer not to say",
  ].map((option) => ({ name: option, value: option }));

  const consentCategoriesOptions = [
    "Select all",
    "Data concerning political opinions",
    "Data concerning religious or philosophical beliefs",
    "Data concerning trade union membership",
    "Data concerning health",
    "Data concerning a person’s sex life or sexual orientation",
  ].map((option) => ({ name: option, value: option }));

  // Validation for required fields
  const isFormValid =
    reasonForJoining &&
    politicalParty &&
    ethnicity &&
    highestQualification &&
    consentCategories.length > 0;

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      reasonForJoining,
      politicalParty,
      ethnicity,
      highestQualification,
      consentCategories:
        consentCategories === "Select all"
          ? [...consentCategoriesOptions.slice(1).map((item) => item.name)]
          : [consentCategories],
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-5">
      <DropdownInput
        name="reasonForJoining"
        label="Could you tell us why you joined NepGov? *"
        placeholder="Please Select"
        options={reasonForJoiningOptions}
        value={reasonForJoining}
        setValue={setReasonForJoining}
        className="rounded-full"
      />

      <DropdownInput
        name="politicalParty"
        label="Which political party do you support? *"
        placeholder="Please Select"
        options={politicalPartyOptions}
        value={politicalParty}
        setValue={setPoliticalParty}
        className="rounded-full"
      />

      <DropdownInput
        name="ethnicity"
        label="What is Your Ethnicity? *"
        placeholder="Please Select"
        options={ethnicityOptions}
        value={ethnicity}
        setValue={setEthnicity}
        className="rounded-full"
      />

      <DropdownInput
        name="highestQualification"
        label="What is the highest educational or work-related qualification you have? *"
        placeholder="Please Select"
        options={highestQualificationOptions}
        value={highestQualification}
        setValue={setHighestQualification}
        className="rounded-full"
      />

      <DropdownInput
        name="consentCategories"
        label="Could you please confirm that you consent to our use of each of the following special categories of personal data? *"
        placeholder="Please Select"
        options={consentCategoriesOptions}
        value={consentCategories}
        setValue={setConsentCategories}
        className="rounded-full"
      />

      <Button type="submit" disabled={!isFormValid}>
        Submit
      </Button>
    </form>
  );
};

export default SurveyForm;
