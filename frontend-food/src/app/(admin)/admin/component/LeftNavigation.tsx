import { LayoutDashboard, Truck, Settings } from "lucide-react";

export const LeftNavigation = () => {
  return (
    <div className="w-[205px] h-screen bg-[#FFF] flex flex-col px-5 pt-[36px] gap-10">
      <div className="flex gap-[10px]">
        <img src="leftNavigation.png" className="w-[36px] h-[30px]" />
        <div>
          <h1 className="text-[18px] font-semibold text-[#09090B]">NomNom</h1>
          <p className="text-[#71717A] text-[12px]">Swift delivery</p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <button className="text-[#FAFAFA] text-[14px] font-medium w-[165px] h-[40px] bg-[#18181B] rounded-full flex items-center justify-center gap-[10px]">
          <LayoutDashboard size={22} />
          Food menu
        </button>

        <button className="text-[#09090B] text-[14px] font-medium w-[165px] h-[40px] bg-transparent rounded-full flex items-center pl-6 gap-[10px]">
          <Truck size={22} />
          Orders
        </button>

        <button className="text-[#09090B] text-[14px] font-medium w-[165px] h-[40px] bg-transparent rounded-full flex items-center pl-6 gap-[10px]">
          <Settings size={22} />
          Settings
        </button>
      </div>
    </div>
  );
};
