import Button from "@/components/input/Button";
import DateTimePickerComponent from "@/components/input/DateTimePicker";
import TextArea from "@/components/input/TextArea";
import TextInput from "@/components/input/TextInput";
import React from "react";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

const CrimeOrIncident = ({
  formData,
  setFormData,
  handleBack,
  handleNext,
  handleInputChange,
  handleDateChange,
}) => {
  return (
    <div>
      <div className="space-y-4 ">
        <div className="bg-white p-10 space-y-5">
          <h2 className="text-2xl font-semibold">
            Where did the crime or incident take place?
          </h2>

          <TextInput
            label="Town or city or Postcode (VITAL INFORMATION)"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />

          <TextArea
            label="Do you have any other address details e.g property number or road name? Can you tell us anything that will help us identify the location?"
            id="additionalLocationDetails"
            name="additionalLocationDetails"
            value={formData.additionalLocationDetails}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-5 bg-white p-10">
          <h3 className="text-2xl font-semibold">
            Do you know when it happened?
          </h3>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  dateKnown: true,
                }))
              }
              variant={!formData?.dateKnown ? "primary-outline" : "primary"}
              className={
                formData?.dateKnown && "hover:!bg-primary hover:!text-white"
              }
            >
              Yes
            </Button>
            <Button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  dateKnown: false,
                }))
              }
              variant={formData?.dateKnown ? "primary-outline" : "primary"}
              className={
                !formData?.dateKnown && "hover:!bg-primary  hover:!text-white"
              }
            >
              No
            </Button>
          </div>
          {formData.dateKnown === true && (
            <DateTimePickerComponent
              label="When did it happen?"
              id="time"
              name="time"
              value={formData.time}
              onChange={(value) => handleDateChange("time", value)}
              disableFuture={true}
            />
          )}
        </div>
        <div className="space-y-4 bg-white p-10">
          <p className="text-2xl font-semibold">
            Tell us more about the crime: what you heard, saw or know about.
          </p>
          <TextArea
            label="Please don't give information about the people involved as you will be asked details about this in the next section. (Required Info)"
            id="crimeDetails"
            name="crimeDetails"
            value={formData.crimeDetails}
            onChange={handleInputChange}
            required
            className={"mb-10"}
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
              disabled={!formData?.location || !formData?.crimeDetails}
            >
              Continue
              <CgChevronRight size={25} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrimeOrIncident;
