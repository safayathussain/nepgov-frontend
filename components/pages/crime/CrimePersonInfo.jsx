import Button from "@/components/input/Button";
import TextArea from "@/components/input/TextArea";
import React from "react";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

const CrimePersonInfo = ({
  formData,
  handleInputChange,
  handleBack,
  handleNext,
}) => {
  return (
    <div>
      <div className="space-y-5 bg-white p-10">
        <h2 className="text-2xl font-semibold">
          Please tell us about the person or people involved or responsible for
          the crime.
        </h2>

        <TextArea
          label="What do you know about the person / people? Can you tell us their names, age or where they live (if different from the address of the crime)?"
          id="personDetails"
          name="personDetails"
          value={formData.personDetails}
          onChange={handleInputChange}
        />

        <TextArea
          label="What does the person / people look like?"
          id="personAppearance"
          name="personAppearance"
          value={formData.personAppearance}
          onChange={handleInputChange}
        />

        <TextArea
          label="Do you know any contact details for the person / people?"
          id="personContact"
          name="personContact"
          value={formData.personContact}
          onChange={handleInputChange}
          className={'mb-10'}
        />
        <hr />
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="primary-outline"
            className={"flex items-center"}
            onClick={handleBack}
          >
            <CgChevronLeft size={25} />
            Go back
          </Button>
          <Button
            type="button"
            onClick={handleNext}
            className={"flex items-center"}
          >
            Continue
            <CgChevronRight size={25} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CrimePersonInfo;
