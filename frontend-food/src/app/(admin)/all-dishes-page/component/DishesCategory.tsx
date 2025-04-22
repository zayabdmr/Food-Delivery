"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
        } hover:border-[#EF4444] cursor-pointer  `}
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
          className="flex items-center gap-2 px-[16px] h-[36px] text-[14px] font-medium rounded-full border border-[#D4D4D8] bg-white text-[#18181B] hover:border-[#EF4444] cursor-pointer"
        >
          {category.categoryName}
          <span className="bg-[#18181B] text-white text-[12px] px-2 py-[2px] rounded-full">
            5
          </span>
        </button>
      ))}

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-[40px] !h-[40px] bg-[#EF4444] flex justify-center items-center rounded-full !static"
          >
            <Plus size={16} color="white" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new category</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 ">
            <Label htmlFor="name" className="text-right">
              Category name
            </Label>
            <Input
              id="name"
              placeholder="Type category name..."
              className="col-span-3"
            />
          </div>

          <DialogFooter>
            <Button type="submit">Add category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
