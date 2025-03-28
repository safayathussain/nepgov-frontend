import Button from "@/components/input/Button";
import { useRouter } from "next/navigation";
import React from "react";
import { CgClose } from "react-icons/cg";

const UnprocessableInfo = () => {
  const items = [
    "Untaxed vehicles",
    "Benefit Fraud",
    "Minor driving offenses",
    "Fly-tipping",
    "Dumped Vehicles",
    "Missing People",
    "You are the Victim",
    "Scam email and phone",
    "Fly-tipping",
  ];
  const router = useRouter();
  return (
    <div className="bg-[#808DA5] text-white  py-10 text-center">
      <h2 className="text-2xl md:text-4xl font-bold mb-4">
        Information we cannot process
      </h2>

      <p className="max-w-[500px] mx-auto mb-10 text-lg px-3">
        As we are not the police, sometimes you may want to pass us information
        that we cannot process. Please see our advice for passing on information
        about the following:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 container ">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 justify-center md:justify-start"
          >
            <div className="rounded-full border border-white p-1">
              <CgClose size={16} />
            </div>
            <span className="font-semibold">{item}</span>
          </div>
        ))}
      </div>
      <div className="my-10">
        <Button
          variant="primary"
          className={'bg-white !text-primary !border-0 hover:!bg-primary hover:!text-white'}
          onClick={() => router.push("/send-crime-info")}
        >
          Give Information Here
        </Button>
      </div>
    </div>
  );
};

export default UnprocessableInfo;
