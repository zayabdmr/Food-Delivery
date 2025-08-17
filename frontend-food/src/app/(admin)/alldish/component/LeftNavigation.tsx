import { LayoutDashboard, Truck } from "lucide-react";

export const LeftNavigation = () => {
  return (
    <aside className="w-[225px] h-screen bg-white flex flex-col px-6 pt-9 gap-10">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <img
          src="leftNavigation.png"
          alt="NomNom Logo"
          className="w-9 h-7.5 object-contain"
        />
        <div>
          <h1 className="text-[18px] font-semibold text-[#09090B]">NomNom</h1>
          <p className="text-[12px] text-[#71717A]">Swift delivery</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <nav className="flex flex-col gap-4 text-[#09090B] text-[14px] font-medium">
        <button className="flex items-center w-[165px] h-10 pl-6 gap-2 rounded-full bg-transparent transition-colors duration-200 hover:bg-[#18181B] hover:text-[#FAFAFA]">
          <LayoutDashboard size={22} />
          Food menu
        </button>

        <button className="flex items-center w-[165px] h-10 pl-6 gap-2 rounded-full bg-transparent transition-colors duration-200 hover:bg-[#18181B] hover:text-[#FAFAFA]">
          <Truck size={22} />
          Orders
        </button>
      </nav>
    </aside>
  );
};
