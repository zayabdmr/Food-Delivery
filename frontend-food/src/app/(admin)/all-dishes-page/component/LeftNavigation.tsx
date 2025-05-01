import { LayoutDashboard, Truck, Settings } from "lucide-react";

export const LeftNavigation = () => {
  return (
    <div className="w-[205px] h-screen bg-white flex flex-col px-5 pt-9 gap-10 shadow-md">
      <div className="flex gap-2 items-center">
        <img src="leftNavigation.png" className="w-9 h-7" alt="Logo" />
        <div>
          <h1 className="text-lg font-semibold text-[#09090B]">NomNom</h1>
          <p className="text-xs text-[#71717A]">Swift delivery</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 text-[#09090B] text-[14px] font-medium">
        <button className="w-[165px] h-10 bg-transparent rounded-full flex items-center pl-6 gap-2 transition-all duration-200 hover:bg-[#18181B] hover:text-[#FAFAFA]">
          <LayoutDashboard size={22} />
          Food menu
        </button>

        <button className="w-[165px] h-10 bg-transparent rounded-full flex items-center pl-6 gap-2 transition-all duration-200 hover:bg-[#18181B] hover:text-[#FAFAFA]">
          <Truck size={22} />
          Orders
        </button>

        <button className="w-[165px] h-10 bg-transparent rounded-full flex items-center pl-6 gap-2 transition-all duration-200 hover:bg-[#18181B] hover:text-[#FAFAFA]">
          <Settings size={22} />
          Settings
        </button>
      </div>
    </div>
  );
};
