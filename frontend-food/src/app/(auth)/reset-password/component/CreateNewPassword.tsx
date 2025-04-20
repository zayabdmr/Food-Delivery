import { ChevronLeft } from "lucide-react";

export const CreateNewPassword = () => {
  return (
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
        Create password
      </button>
    </div>
  );
};
