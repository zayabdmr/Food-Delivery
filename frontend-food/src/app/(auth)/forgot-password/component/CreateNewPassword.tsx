"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface CreateNewPasswordProps {
  handlePreviousPage: () => void;
}

export const CreateNewPassword = ({
  handlePreviousPage,
}: CreateNewPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-around w-full h-full">
      <div className="flex flex-col gap-6 w-[370px]">
        <Button
          onClick={handlePreviousPage}
          className="bg-white border text-black px-4 py-2 w-[36px]"
        >
          <ArrowLeft />
        </Button>

        <div>
          <p className="text-[24px] font-semibold">Create a strong password</p>
          <p className="text-[16px] text-[#71717A]">
            Set a new password with a combination of letters and numbers for
            better security.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <Input
            name="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Input
            name="confirmPassword"
            placeholder="Confirm Password"
            type={showPassword ? "text" : "password"}
          />
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <Checkbox id="showPassword" onClick={handleShowPassword} />
            <Label
              htmlFor="showPassword"
              className="text-[#71717A] font-normal"
            >
              Show password
            </Label>
          </div>
        </div>

        <Button onClick={() => router.push("/login")} className="bg-black">
          Go
        </Button>
      </div>
    </div>
  );
};
