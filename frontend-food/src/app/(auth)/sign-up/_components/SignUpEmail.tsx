"use client";

import { ArrowLeft } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const SignUpEmail = ({
  onNextStep,
  handlePreviousStep,
  handleAlreadyHaveAccount,
}: {
  onNextStep: (email: string) => void;
  handlePreviousStep: () => void;
  handleAlreadyHaveAccount: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

  const handleNext = () => {
    const email = inputRef.current?.value?.trim() || "";

    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Invalid email. Use a format like example@email.com");
      return;
    }

    setEmailError("");
    onNextStep(email);
  };

  return (
    <div className="flex items-center justify-around w-full h-full">
      <div className="flex flex-col gap-6 w-[370px]">
        <Button
          className="bg-white border text-black px-4 py-2 w-[36px] hover:bg-gray-50"
          onClick={handlePreviousStep}
        >
          <ArrowLeft />
        </Button>

        <div>
          <p className="text-[24px] font-semibold">Create your account</p>
          <p className="text-[16px] text-[#71717A]">
            Sign up to explore your favorite dishes.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <Input
            ref={inputRef}
            name="email"
            placeholder="Enter your email address"
            type="email"
            className={
              emailError ? "border-red-500 focus-visible:ring-red-500" : ""
            }
            onKeyDown={(e) => e.key === "Enter" && handleNext()}
          />
          {emailError && (
            <span className="text-red-500 text-sm">{emailError}</span>
          )}
        </div>

        <Button onClick={handleNext} className="bg-black text-white">
          Let's Go
        </Button>

        <p className="text-center text-[#71717A]">
          Already have an account?{" "}
          <span
            onClick={handleAlreadyHaveAccount}
            className="text-[#2563EB] cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};
