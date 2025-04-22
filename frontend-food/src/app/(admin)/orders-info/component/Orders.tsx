import { CalendarDays } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronsUpDown } from "lucide-react";

export const Orders = () => {
  return (
    <div>
      <div className="flex justify-between w-[1171px] bg-[#FFF] p-4 rounded-lg">
        <div>
          <p className="text-[#09090B] text-[20px] font-bold">Orders</p>
          <p className="text-[#71717A] text-[12px] font-medium">32 items</p>
        </div>
        <div className="flex gap-3 justify-end">
          <input
            type="date"
            className="w-[300px] h-[36px] rounded-full px-4 py-2 text-[#09090B] text-[14px] border border-[#E4E4E7] relative"
          />
          {/* <CalendarDays className="absolute" /> */}
          <button className="text-[#FAFAFA] text-[14px] font-medium bg-[#18181B] w-[180px] h-[36px] px-4 py-2 rounded-full flex items-center justify-center ">
            Change delivery state
          </button>
        </div>
      </div>
      <div className="flex items-center text-[#71717A] text-[14px] font-medium gap-4 p-4 ">
        <Checkbox className="w-[16px]" />

        <p className="text-[#09090B] text-[14px]">№</p>
        <p className="w-[182px]">Customer</p>
        <p className="w-[160px]">Food</p>
        <div className="flex justify-end items-center">
          <p className="w-[160px]">Date</p>
          <ChevronsUpDown size={16} />
        </div>
        <p className="w-[160px]">Total </p>
        <p className="w-[160x]">Delivery Address</p>

        <div className="flex justify-end items-center">
          <p className="w-[160px]">Delivery state</p>
          <ChevronsUpDown size={16} />
        </div>
      </div>
    </div>
  );
};
