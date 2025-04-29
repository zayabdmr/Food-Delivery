import { Plus } from "lucide-react";

export const AddNewCard = ({ categoryName }: { categoryName: string }) => (
  <div className="border-2 border-dashed border-[#EF4444] rounded-[20px] w-full h-[342px] flex flex-col justify-center items-center text-center cursor-pointer hover:bg-[#fef2f2] transition">
    <Plus className="text-[#EF4444]" size={32} />
    <p className="mt-4 text-[#EF4444] font-medium text-[16px] max-w-[120px]">
      Add new Dish to {categoryName}
    </p>
  </div>
);
