"use client";
import { ChevronLeft } from "lucide-react";
import axios from "axios";
import { useRef, useState } from "react";

export const LogIn = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  const validateInput = () => {
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email. Use a format like example@email.com.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    } else {
      setPasswordError("");
    }

    setIsButtonActive(valid);
  };

  const handleLogin = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) return;

    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      if (message.toLowerCase().includes("email")) {
        setEmailError(message);
      } else if (message.toLowerCase().includes("password")) {
        setPasswordError(message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 px-6 py-8 max-w-sm w-full mx-auto">
      <button className="w-9 h-9 flex justify-center items-center border border-[#E4E4E7] rounded-md">
        <ChevronLeft size={16} />
      </button>

      <div className="space-y-1">
        <h3 className="text-[#09090B] text-[24px] font-semibold">Log in</h3>
        <p className="text-[#71717A] text-[16px]">
          Log in to enjoy your favorite dishes.
        </p>
      </div>

      <div className="space-y-2">
        <input
          ref={emailRef}
          type="email"
          onChange={validateInput}
          placeholder="Enter your email address"
          className={`w-[416px] h-[36px] px-3 py-2 border rounded-md text-[14px] ${
            emailError ? "border-red-500" : "border-[#E4E4E7]"
          }`}
        />
        {emailError && <p className="text-red-500 text-[12px]">{emailError}</p>}

        <input
          ref={passwordRef}
          type="password"
          onChange={validateInput}
          placeholder="Password"
          className={`w-[416px] h-[36px] px-3 py-2 border rounded-md text-[14px] ${
            passwordError ? "border-red-500" : "border-[#E4E4E7]"
          }`}
        />
        {passwordError && (
          <p className="text-red-500 text-[12px]">{passwordError}</p>
        )}
      </div>

      <button className="text-[14px] text-[#18181B] flex justify-start hover:underline">
        Forgot password ?
      </button>

      <button
        onClick={handleLogin}
        className={`w-[416px] h-[36px] text-[#FAFAFA] text-[14px] font-medium rounded-md ${
          isButtonActive
            ? "bg-[#18181B] hover:bg-black cursor-pointer"
            : "bg-[#E4E4E7] cursor-not-allowed"
        }`}
        disabled={!isButtonActive}
      >
        Let's Go
      </button>

      <div className="flex w-[416px] justify-center gap-3 text-[16px]">
        <p className="text-[#71717A]">Don’t have an account?</p>
        <button className="text-[#2563EB] hover:underline">Sign up</button>
      </div>
    </div>
  );
};
