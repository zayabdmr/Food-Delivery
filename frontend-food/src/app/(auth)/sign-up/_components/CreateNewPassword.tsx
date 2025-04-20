import { ChevronLeft } from "lucide-react";

export const CreateNewPassword = () => {
  return (
    <div className="flex flex-col gap-6 px-6 py-8 max-w-sm w-full mx-auto">
      <button className="w-9 h-9 flex justify-center items-center border border-[#E4E4E7] rounded-md">
        <ChevronLeft size={16} />
      </button>

      <div className="space-y-1">
        <h3 className="text-[#09090B] text-[24px] font-semibold">
          Create a strong password
        </h3>
        <p className="text-[#71717A] text-[16px]">
          Create a strong password with letters, numbers.
        </p>
      </div>

      <div className="space-y-4">
        <input
          type="password"
          placeholder="Password"
          className="w-[416px] h-[36px] px-3 py-2 border border-[#E4E4E7] rounded-md text-[14px]"
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
        Let's Go
      </button>

      <div className="flex w-[416px] justify-center gap-3 text-[16px]">
        <p className="text-[#71717A]">Already have an account?</p>
        <button className="text-[#2563EB] hover:underline">Log in</button>
      </div>
    </div>
  );
};
