import { ChevronLeft } from "lucide-react";

export const CreateAccount = () => {
  return (
    <div className="flex flex-col gap-6 px-6 py-8 max-w-md w-full mx-auto">
      <button className="w-[36px] h-[36px] justify-center items-center border-[2px] rounded-[4px] border-[#E4E4E7]">
        <ChevronLeft />
      </button>

      <h3 className="text-[#09090B] text-2xl font-semibold">
        Create your account
      </h3>

      <p className="text-[#71717A] text-base">
        Sign up to explore your favorite dishes.
      </p>

      <input
        placeholder="Enter your email address"
        className="w-full h-10 px-3 py-2 border border-[#E4E4E7] rounded-md"
      />

      <button className="text-white text-sm font-medium w-full h-10 bg-[#18181B] rounded-xl">
        Let's Go
      </button>

      <div className="flex justify-center gap-3 text-sm">
        <p className="text-[#71717A]">Already have an account?</p>
        <p className="text-[#2563EB] cursor-pointer hover:underline">Log in</p>
      </div>
    </div>
  );
};
