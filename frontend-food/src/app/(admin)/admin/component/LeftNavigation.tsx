export const LeftNavigation = () => {
  return (
    <div className="w-[205px] h-[screen] bg-[#FFF] flex flex-col px-5 pt-[36px]">
      <div className="flex gap-[10px]">
        <img src="leftNavigation.png" className="w-[36px] h-[30px]" />
        <div>
          <h1 className="text-[18px] font-semibold text-[#09090B]">NomNom</h1>
          <p className="text-[#71717A] text-[12px]">Swift delivery</p>
        </div>
      </div>
      <button className="text-[#FAFAFA] text-[14px] font-medium w-[165px] h-[40px] bg-[#18181B] rounded-full">
        Food menu
      </button>
    </div>
  );
};
