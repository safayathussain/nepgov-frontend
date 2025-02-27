import Button from "@/components/input/Button";
import CheckInput from "@/components/input/CheckInput";
import DropdownInput from "@/components/input/DropdownInput";
import React from "react";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

const CrimeType = ({
  formData,
  setFormData,
  crimeOptions,
  handleBack,
  handleNext,
}) => {
  return (
    <div>
      <div className="space-y-4 bg-white p-10">
        <CheckInput
          id="urgentConfirmation"
          label="I confirm that this form is not being used to report something that requires urgent Police attention"
          value={formData.confirmNoPoliceAttention}
          setValue={(checked) =>
            setFormData((prev) => ({ ...prev, confirmNoPoliceAttention: checked }))
          }
          required
        />

        <h2 className="text-2xl font-semibold mt-4">
          What is the crime or incident you would like to tell us about?
        </h2>

        <DropdownInput
          name="crimeType"
          value={formData.crimeType}
          setValue={(value) =>
            setFormData((prev) => ({ ...prev, crimeType: value }))
          }
          options={crimeOptions}
          className="!rounded-full mb-6"
          placeholder="Please Select"
        />
        <hr />
        <div className="flex justify-between pt-6">
          {/* <Button
            type="button"
            variant="primary-outline"
            className={"flex items-center"}
            onClick={handleBack}
          >
            <CgChevronLeft size={25} />
            Go back
          </Button> */}
          <div></div>
          <Button
            type="button"
            onClick={handleNext}
            className={"flex items-center"}
            disabled={!formData?.confirmNoPoliceAttention || !formData?.crimeType}
          >
            Continue
            <CgChevronRight size={25} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CrimeType;
