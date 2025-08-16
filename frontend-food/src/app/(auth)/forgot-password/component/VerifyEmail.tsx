"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useRouter } from "next/navigation";

interface VerifyEmailProps {
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  emailInputRef: React.RefObject<HTMLInputElement | null>;
}

export const VerifyEmail = ({
  handleNextPage,
  handlePreviousPage,
  emailInputRef,
}: VerifyEmailProps) => {
  const router = useRouter();

  const email = emailInputRef.current?.value;

  return (
    <div className="flex items-center justify-around w-full h-full">
      <div className="flex flex-col gap-6 w-[370px]">
        <Button
          className="bg-white border text-black px-4 py-2 w-[36px]"
          onClick={handlePreviousPage}
        >
          <ArrowLeft />
        </Button>

        <div>
          <p className="text-[24px] font-semibold">Please verify your email</p>
          <p className="text-[16px] text-[#71717A]">
            We just sent an email to {email}. Click the link in the email to
            verify your account.
          </p>
        </div>

        <Button className="bg-black" onClick={handleNextPage}>
          Okey
        </Button>
      </div>
    </div>
  );
};
