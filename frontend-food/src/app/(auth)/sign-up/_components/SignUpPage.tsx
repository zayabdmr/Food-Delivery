"use client";

import { useState } from "react";
import { SignUpEmail } from "./SignUpEmail";
import { SignUpPassword } from "./SignUpPassword";

export function SignUpPage() {
  const [step, setStep] = useState<number>(0);

  return step === 0 ? (
    <SignUpEmail setStep={setStep} />
  ) : (
    <SignUpPassword setStep={setStep} />
  );
}
