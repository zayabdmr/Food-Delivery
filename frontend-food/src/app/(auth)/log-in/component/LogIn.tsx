"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/utils";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Label } from "@radix-ui/react-label";
import { ChevronLeft } from "lucide-react";
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
    <div className="flex flex-col gap-4 w-[500px]">
      <div className="flex items-center justify-around w-full h-full">
        <div className="flex flex-col gap-6 w-[350px]">
          <Button className="bg-white border text-black w-9 h-9 p-0">
            <div className="cursor-pointer">
              <ChevronLeft size={16} />
            </div>
          </Button>

          <div>
            <p className="text-[#09090B] text-[24px] font-semibold">Log in</p>

            <p className="text-[16px] text-[#71717A]">
              Log in to enjoy your favorite dishes.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <Input ref={emailRef} placeholder="Enter your email address" />
          </div>
          <div className="flex flex-col gap-1">
            <Input ref={passwordRef} placeholder="Password" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <a className="text-[#18181B] text-[14px]">Forgot password ?</a>
            </div>
          </div>

          <Button onClick={handleOnClick} className="bg-black   ">
            Let's Go
          </Button>
        </div>
      </div>
    </div>
  );
};
