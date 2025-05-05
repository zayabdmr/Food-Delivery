"use client";

import { axiosInstance } from "@/lib/utils";
import React, { useRef } from "react";

export const LogIn = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleOnClick = async () => {
    const response = await axiosInstance.post("/login", {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    });
    localStorage.setItem("token", response.data.token);
    console.log(response, "response");
  };

  return (
    <div className="flex flex-col gap-4 w-[200px]">
      <input
        ref={emailRef}
        className="p-2 border border-white"
        type="email"
        placeholder="Type your email..."
      />
      <input
        ref={passwordRef}
        className="p-2 border border-white"
        type="password"
        placeholder="Type your password..."
      />
      <button
        onClick={handleOnClick}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Login
      </button>

      <div className="flex flex-col gap-6 px-6 py-8 max-w-sm w-full mx-auto">
        <div className="space-y-1">
          <h3 className="text-[#09090B] text-[24px] font-semibold">
            Create new password
          </h3>
          <p className="text-[#71717A] text-[16px] w-[416px]">
            Set a new password with a combination of letters and numbers for
            better security.
          </p>
        </div>

        <div className="space-y-4">
          <input
            ref={emailRef}
            className="w-[416px] h-[36px] px-3 py-2 border border-[#E4E4E7] rounded-md text-[14px]"
            type="email"
            placeholder="Type your email..."
          />

          <input
            type="password"
            placeholder="Confirm"
            className="w-[416px] h-[36px] px-3 py-2 border border-[#E4E4E7] rounded-md text-[14px]"
          />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4" />
          <label className="text-[14px] text-[#71717A]">Show password</label>
        </div>

        <button
          className="w-[416px] h-[36px] text-[#FAFAFA] text-[14px] font-medium bg-[#E4E4E7] rounded-md cursor-not-allowed"
          disabled
        >
          Create password
        </button>
      </div>
    </div>
  );
};
