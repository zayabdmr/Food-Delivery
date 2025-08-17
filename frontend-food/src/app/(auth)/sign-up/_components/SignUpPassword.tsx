"use client";

import { ArrowLeft } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/utils";
import { AxiosError } from "axios";

type SignUpPasswordProps = {
  email: string;
  handlePreviousStep: () => void;
  handleAlreadyHaveAccount: () => void;
};

export const SignUpPassword = ({
  email,
  handlePreviousStep,
  handleAlreadyHaveAccount,
}: SignUpPasswordProps) => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [error, setError] = useState({
    password: false,
    confirmPassword: false,
  });
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password: string) => {
    if (password.length < 6)
      return "Password must be at least 6 characters long";
    if (!/(?=.*[a-zA-Z])/.test(password))
      return "Weak password. Use numbers and symbols.";
    return "";
  };

  const setFieldError = (
    field: "password" | "confirmPassword",
    message: string
  ) => {
    setError((prev) => ({ ...prev, [field]: true }));
    setPasswordError(message);
  };

  function isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError).isAxiosError === true;
  }

  const handleSignupError = (err: unknown) => {
    console.error("Signup error:", err);
    if (isAxiosError(err)) {
      const status = err.response?.status;
      if (status === 409 || status === 405) {
        setPasswordError(
          "This email is already registered. Please use a different email."
        );
      } else if (status === 400) {
        setPasswordError(
          (err.response?.data as { message?: string })?.message ||
            "Invalid input. Please check your information."
        );
      } else if (
        err.code === "ECONNREFUSED" ||
        err.message.includes("Network Error")
      ) {
        setPasswordError(
          "Unable to connect to server. Please try again later."
        );
      } else {
        setPasswordError("Failed to create account. Please try again.");
      }
    } else {
      setPasswordError("An unexpected error occurred.");
    }
  };

  const handleSignup = async () => {
    const password = passwordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";

    setError({ password: false, confirmPassword: false });
    setPasswordError("");

    if (!password) return setFieldError("password", "Password is required");
    if (!confirmPassword)
      return setFieldError("confirmPassword", "Please confirm your password");

    const passwordValidation = validatePassword(password);
    if (passwordValidation)
      return setFieldError("password", passwordValidation);
    if (password !== confirmPassword)
      return setFieldError("confirmPassword", "Passwords do not match");

    setIsLoading(true);
    try {
      const response = await axiosInstance.post(`/user`, { email, password });
      console.log("Account created successfully:", response.data);
      router.push("/login?message=Account created successfully");
    } catch (err: unknown) {
      handleSignupError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-around w-full h-full">
      <div className="flex flex-col gap-6 w-[370px]">
        <Button
          className="bg-white border text-black px-4 py-2 w-[36px] hover:bg-gray-50"
          onClick={handlePreviousStep}
          disabled={isLoading}
        >
          <ArrowLeft />
        </Button>

        <div>
          <p className="text-[24px] font-semibold">Create a strong password</p>
          <p className="text-[16px] text-[#71717A]">
            Create a strong password with letters and numbers.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <Input
            ref={passwordRef}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            className={
              error.password ? "border-red-500 focus-visible:ring-red-500" : ""
            }
            disabled={isLoading}
            onKeyDown={(e) => e.key === "Enter" && handleSignup()}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Input
            ref={confirmPasswordRef}
            placeholder="Confirm Password"
            type={showPassword ? "text" : "password"}
            className={
              error.confirmPassword
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }
            disabled={isLoading}
            onKeyDown={(e) => e.key === "Enter" && handleSignup()}
          />
          {passwordError && (
            <span className="text-red-500 text-sm">{passwordError}</span>
          )}
        </div>

        <label className="flex px-1 gap-2 text-[14px] cursor-pointer">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
            disabled={isLoading}
          />
          Show password
        </label>

        <Button
          onClick={handleSignup}
          className="bg-black text-white"
          disabled={isLoading}
        >
          Go
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
