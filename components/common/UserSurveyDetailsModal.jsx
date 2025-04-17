import React, { useState } from "react";
import Modal from "./Modal";
import Button from "../input/Button";
import SurveyForm from "./UserSurveyForm";
import { refetchAuth, useAuth } from "@/utils/functions";
import { FetchApi } from "@/utils/FetchApi";

const UserSurveyDetailsModal = ({ open, setOpen }) => {
  const [step, setstep] = useState(0);
  const { auth } = useAuth();
  const handleSurveyDataSubmit = async (data) => {
    await FetchApi({
      url: `/auth/user-profile-survey`,
      method: "post",
      data,
      isToast: true,
      callback: () => setOpen(false)
    });
    refetchAuth()
  };
  return (
    <div>
      {open &&
      <Modal setOpen={setOpen}>
        {step === 0 && (
          <>
            <p className="text-3xl font-semibold text-center mb-2">
              Our use of your data
            </p>
            <p>
              NepGov uses personal data to deliver valuable research to our
              clients. If you agree, we’d like to store and/or access
              information on a device to share your personal data, such as an
              email address or online ID, and the responses you have given us in
              our surveys with trusted partners. These partners may use this
              data to develop and improve products, for example to create
              statistical models that target people on the internet that look
              like you, and to apply market research to generate audience
              insights.
            </p>
            <p>
              You can review your options and the list of our partners at any
              time in the ‘Permissions’ tab of your Account Page, and you can
              visit our privacy notice for further information.
            </p>
            <div className="flex justify-between pt-5">
              <Button variant="primary-outline">I Disagree</Button>
              <Button onClick={() => setstep(1)}>I Agree</Button>
            </div>
          </>
        )}
        {step === 1 && (
          <div>
            <SurveyForm onSubmit={handleSurveyDataSubmit} />
          </div>
        )}
      </Modal>
      }
    </div>
  );
};

export default UserSurveyDetailsModal;
