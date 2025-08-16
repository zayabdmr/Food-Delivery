"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignUpEmail } from "./SignUpEmail";
import { SignUpPassword } from "./SignUpPassword";

const SignUpSteps = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleNextStep = (userEmail: string) => {
    setEmail(userEmail);
    setStep(1);
  };

  const handlePreviousStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleAlreadyHaveAccount = () => {
    router.push("/login");
  };

  const steps = [
    <SignUpEmail
      key="email"
      onNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleAlreadyHaveAccount={handleAlreadyHaveAccount}
    />,
    <SignUpPassword
      key="password"
      email={email}
      handlePreviousStep={handlePreviousStep}
      handleAlreadyHaveAccount={handleAlreadyHaveAccount}
    />,
  ];

  return <div className="flex w-full h-full">{steps[step]}</div>;
};

export default SignUpSteps;
