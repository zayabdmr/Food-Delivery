export const CreateAccount = () => {
  return (
    <div>
      <h3 className="text-[#09090B] text-[24px] font-semibold">
        Create your account
      </h3>
      <p className="text-[#71717A] text-[16px] ">
        Sign up to explore your favorite dishe s.
      </p>
      <input
        placeholder="Enter your email address"
        className="w-[392px] px-[8px] py-[12px] border border-[#E4E4E7]"
      />
      <button className="w-[352px] h-[36p]" />
      <div className="flex gap-3">
        <p className="text-[#71717A] text-[16px] ">Already have an account?</p>
        <p className="text-[#2563EB] text-[16px]">Log in</p>
      </div>
    </div>
  );
};
