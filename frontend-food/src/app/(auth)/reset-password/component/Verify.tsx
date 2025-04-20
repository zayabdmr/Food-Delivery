import { ChevronLeft } from "lucide-react";

export const Verify = () => {
  return (
    <div className="flex flex-col gap-6 px-6 py-8 max-w-sm w-full mx-auto">
      <button className="w-9 h-9 flex justify-center items-center border border-[#E4E4E7] rounded-md">
        <ChevronLeft size={16} />
      </button>

      <div className="space-y-1">
        <h3 className="text-[#09090B] text-[24px] font-semibold">
          Please verify Your Email
        </h3>
        <p className="text-[#71717A] text-[16px] w-[416px]">
          We just sent an email to Test@gmail.com. Click the link in the email
          to verify your account.
        </p>
      </div>

      <button
        className="w-[416px] h-[36px] text-[#FAFAFA] text-[14px] font-medium bg-[#18181B] rounded-md cursor-not-allowed"
        disabled
      >
        Resend email
      </button>
    </div>
  );
};
