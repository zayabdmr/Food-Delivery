"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";
import { Plus } from "lucide-react";

type Category = {
  _id: string;
  categoryName: string;
};

export const DishesCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "all"
  );
  const router = useRouter();

  const handleOnclick = (id: string) => {
    setSelectedCategory(id);
    router.push(`/searchFilter?category=${id}&page=1`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/foodCategory");
        setCategories(response.data.foodCategory);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-wrap gap-3 pt-4">
      <button
        onClick={() => handleOnclick("all")}
        className={`flex items-center gap-2 px-[16px] h-[36px] text-[14px] font-medium rounded-full border transition-colors duration-200 ${
          selectedCategory === "all"
            ? "border-[#DC2626] text-[#18181B]"
            : "border-[#D4D4D8] text-[#18181B] hover:border-[#DC2626]"
        } bg-white`}
      >
        All Dishes
        <span className="bg-[#18181B] text-white text-[12px] px-2 py-[2px] rounded-full">
          112
        </span>
      </button>

      {categories.map((category) => (
        <button
          key={category._id}
          onClick={() => handleOnclick(category._id)}
          className="flex items-center gap-2 px-[16px] h-[36px] text-[14px] font-medium rounded-full border border-[#D4D4D8] bg-white text-[#18181B]"
        >
          {category.categoryName}
          <span className="bg-[#18181B] text-white text-[12px] px-2 py-[2px] rounded-full">
            5
          </span>
        </button>
      ))}

      <button className="w-[36px] h-[36px] flex items-center justify-center bg-[#EF4444] rounded-full">
        <Plus className="text-white" size={18} />
      </button>
    </div>
  );
};
