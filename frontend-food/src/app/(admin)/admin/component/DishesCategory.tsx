"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Category = {
  _id: string;
  categoryName: string;
};

export const DishesCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  const handleOnclick = (id: string) => {
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
    <div className="flex gap-3">
      {categories.length > 0 ? (
        categories.map((category) => (
          <Badge
            onClick={() => handleOnclick(category._id)}
            key={category._id}
            variant="outline"
            className="flex items-center h-[36px] gap-1 px-[16px] py-2 text-[14px] text-[#18181B] bg-[#FFF] border-[#D4D4D8] rounded-full font-medium hover:bg-[#EF4444] cursor-pointer"
          >
            {category.categoryName}
          </Badge>
        ))
      ) : (
        <p className="text-[#71717A]">No categories available</p>
      )}
    </div>
  );
};
