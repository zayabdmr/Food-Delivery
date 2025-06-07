"use client";
import { useState } from "react";
import { CreateAccount } from "./CreateAccount";
import { CreateNewPassword } from "./CreateNewPassword";

export function CreateAccountPage() {
  const [step, setStep] = useState<number>(0);

  if (step === 0) {
    return <CreateAccount setStep={setStep} />;
  } else {
    return <CreateNewPassword setStep={setStep} />;
  }
}
