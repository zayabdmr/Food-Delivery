"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Category = {
  _id: string;
  categoryName: string;
};

export const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/foodCategory");

        console.log(response.data.data);
        setCategories(response.data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-screen h-[176px] px-[48px] py-[32px] bg-[#404040] space-y-9">
      <h2 className="pl-[30px] text-[#FFF] text-[30px] font-semibold">
        Categories
      </h2>

      <div className="flex space-y-2 items-center">
        <button className="p-4 text-white hover:bg-gray-600 rounded-full">
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-[10px]">
          {categories ? (
            categories.map((category) => (
              <Badge
                key={category._id}
                variant="outline"
                className="flex items-center h-[36px] gap-1 px-3 py-2 text-[18px] text-[#18181B] bg-[#FFF] border-[#D4D4D8] rounded-full font-normal hover:bg-[#EF4444] cursor-pointer"
              >
                {category.categoryName}
              </Badge>
            ))
          ) : (
            <p className="text-[#71717A]">No categories available</p>
          )}
        </div>
        <button className="p-4 text-white hover:bg-gray-600 rounded-full">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
