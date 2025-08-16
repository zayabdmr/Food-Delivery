"use client";

import { ArrowLeft } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/utils";

export const LoginPasswordEmail = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const handleLogin = async () => {
    const email = emailRef.current?.value.trim() || "";
    const password = passwordRef.current?.value || "";

    let emailError = "";
    let passwordError = "";

    if (!email) {
      emailError = "Email is required";
    } else if (!validateEmail(email)) {
      emailError = "Invalid email. Use a format like example@email.com.";
    }

    if (!password) {
      passwordError = "Password is required";
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    setIsLoading(true);
    setErrors({ email: "", password: "" });

    try {
      const response = await axiosInstance.post(`/login`, { email, password });

      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        router.push("/");
      } else {
        setErrors({ email: "", password: "Login failed. Please try again." });
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        setErrors({
          email: "",
          password: "Incorrect password. Please try again.",
        });
      } else if (err.response?.status === 404) {
        setErrors({ email: "Account not found.", password: "" });
      } else if (
        err.code === "ECONNREFUSED" ||
        err.message.includes("Network Error")
      ) {
        setErrors({
          email: "",
          password: "Unable to connect to server. Try again later.",
        });
      } else {
        setErrors({ email: "", password: "Login failed. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  const handleSignUpRedirect = () => {
    router.push("/sign-up");
  };

  return (
    <div className="flex items-center justify-around w-full h-full">
      <div className="flex flex-col gap-6 w-[370px]">
        <Button
          className="bg-white border text-black px-4 py-2 w-[36px] hover:bg-gray-50"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </Button>

        <div>
          <p className="text-[24px] font-semibold">Log in</p>
          <p className="text-[16px] text-[#71717A]">
            Log in to enjoy your favorite dishes.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <Input
            ref={emailRef}
            placeholder="Enter your email address"
            type="email"
            name="email"
            className={
              errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
            }
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            ref={passwordRef}
            placeholder="Password"
            type="password"
            name="password"
            className={
              errors.password ? "border-red-500 focus-visible:ring-red-500" : ""
            }
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password}</span>
          )}
        </div>

        <a href="/forgot-password" className="underline text-black">
          Forgot password?
        </a>

        <Button
          onClick={handleLogin}
          className="bg-black text-white"
          disabled={isLoading}
        >
          Log In
        </Button>

        <p className="text-center text-[#71717A]">
          Don’t have an account?{" "}
          <span
            onClick={handleSignUpRedirect}
            className="text-[#2563EB] cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};
