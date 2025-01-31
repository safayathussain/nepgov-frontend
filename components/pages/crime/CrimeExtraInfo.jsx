import Button from "@/components/input/Button";
import CheckInput from "@/components/input/CheckInput";
import React from "react";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

const CrimeExtraInfo = ({ formData, handleBack, handleNext, setFormData }) => {
  return (
    <div>
      <div className="space-y-6   ">
        <div className="space-y-5 bg-white p-10">
          <h2 className="text-2xl font-semibold">
            Do any of the people involved in the crime have access to a
            vehicle(s)?
          </h2>
          <div className="flex gap-2 flex-wrap">
            <Button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  hasVehicle: "yes",
                }))
              }
              variant="primary-outline"
            >
              Yes
            </Button>
            <Button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  hasVehicle: "No",
                }))
              }
              variant="primary-outline"
            >
              No
            </Button>
            <Button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  hasVehicle: "dontknow",
                }))
              }
              variant="primary-outline"
            >
              Don't Know
            </Button>
          </div>
        </div>

        <div className="space-y-5 bg-white p-10">
          <h2 className="text-2xl font-semibold">
            Do any of the people involved in the crime have access to a
            weapon/weapons?
          </h2>
          <div className="flex gap-2 flex-wrap">
          <Button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  hasWeapon: "yes",
                }))
              }
              variant="primary-outline"
            >
              Yes
            </Button>
            <Button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  hasWeapon: "No",
                }))
              }
              variant="primary-outline"
            >
              No
            </Button>
            <Button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  hasWeapon: "dontknow",
                }))
              }
              variant="primary-outline"
            >
              Don't Know
            </Button>
             
          </div>
        </div>

        <div className="space-y-5 bg-white p-10">
          <h2 className="text-2xl font-semibold">
            Keep in contact (your details will always be completely anonymous):
          </h2>
          <p className="text-sm">
            If we need to clarify any information or you think there might be
            extra information you can give, are you prepared to create an
            anonymous log-in case you have more questions?
          </p>
          <div className="flex gap-4 flex-col sm:flex-row">
            <button
              type="button"
              className="px-4 py-2 bg-primary text-white rounded"
              onClick={() => {
                setFormData((prev) => ({ ...prev, keepInContact: "yes" }));
                handleNext();
              }}
            >
              Yes create me an anonymous log in case you have more questions
            </button>
            <button
              type="button"
              className="px-4 py-2 border rounded"
              onClick={() => {
                setFormData((prev) => ({ ...prev, keepInContact: "no" }));
                handleNext();
              }}
            >
              No, I've given you all the info you will need
            </button>
          </div>

          <CheckInput
            id="terms"
            label="By opting in to the Keep in Contact portal I understand I am setting up an anonymous User communication with Crimestoppers. I understand that Crimestoppers guarantee that any information I provide is shared with police 100% anonymously, and that police may ask follow-up questions through the portal"
            value={formData.acceptTerms}
            setValue={(checked) =>
              setFormData((prev) => ({ ...prev, acceptTerms: checked }))
            }
            required
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
    </div>
  );
};

export default CrimeExtraInfo;
