"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { axiosInstance } from "@/lib/utils";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
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

import { AddNewCard } from "../../alldish/component/AddNewCard";
import { FoodCard } from "../../alldish/component/FoodCard";

type Food = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
};

type Category = {
  _id: string;
  categoryName: string;
  foods: Food[];
};

export const ProductList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryId = searchParams.get("categoryId");

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/food/category/");
      setCategories(response.data.foods);
    } catch (error) {
      console.error("Error fetching foods:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleCategoryClick = (id: string | null) => {
    router.push(id ? `?categoryId=${id}` : "/");
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      alert("Please enter category name.");
      return;
    }

    try {
      const response = await axiosInstance.post("/category", {
        categoryName: newCategoryName,
      });

      const newCategory = response.data.category;
      setNewCategoryName("");
      setDialogOpen(false);
      await fetchFoods();

      if (newCategory?._id) {
        router.push(`?categoryId=${newCategory._id}`);
      }
    } catch (error) {
      console.error("Failed to add category:", error);
      alert("Failed to add category.");
    }
  };

  const filteredCategories = categoryId
    ? categories.filter((cat) => cat._id === categoryId)
    : categories;

  const getTotalCount = () =>
    categories.reduce((acc, curr) => acc + curr.foods.length, 0);

  return (
    <div className="bg-white min-h-screen rounded-[12px]">
      <section className="w-full px-10 py-8">
        <h2 className="text-[22px] font-semibold mb-4">Dishes category</h2>

        <div className="flex gap-2 flex-wrap">
          <CategoryTab
            label={`All Dishes (${getTotalCount()})`}
            active={!categoryId}
            onClick={() => handleCategoryClick(null)}
          />

          {categories.map((cat) => (
            <CategoryTab
              key={cat._id}
              label={`${cat.categoryName} (${cat.foods.length})`}
              active={categoryId === cat._id}
              onClick={() => handleCategoryClick(cat._id)}
            />
          ))}

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-[40px] h-[40px] bg-[#EF4444] rounded-full flex items-center justify-center">
                <Plus size={16} color="white" />
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[460px]">
              <DialogHeader>
                <DialogTitle className="text-[18px] font-semibold text-[#09090B]">
                  Add new category
                </DialogTitle>
              </DialogHeader>

              <div className="flex flex-col gap-2 mt-4 text-[14px]">
                <Label
                  htmlFor="categoryName"
                  className="text-[#09090B] font-medium"
                >
                  Category name
                </Label>
                <Input
                  id="categoryName"
                  placeholder="Type category name..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="h-[42px] text-[#71717A]"
                />
              </div>

              <DialogFooter className="pt-4">
                <Button
                  onClick={handleAddCategory}
                  className="w-[123px] h-[40px] text-[14px] text-white font-semibold"
                >
                  Add category
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="px-10 pb-20">
        {loading ? (
          <p className="text-center text-2xl">Loading...</p>
        ) : (
          filteredCategories.map((category) => (
            <div key={category._id} className="mb-12">
              <h3 className="text-[22px] font-semibold mb-4">
                {category.categoryName} ({category.foods.length})
              </h3>

              <div className="flex flex-wrap gap-4">
                <AddNewCard category={category} refetchDishes={fetchFoods} />

                {category.foods.map((food) => (
                  <FoodCard
                    key={food._id}
                    food={food}
                    refetchDishes={fetchFoods}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

const CategoryTab = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <span
      onClick={onClick}
      className={`px-4 py-2 text-[14px] rounded-full cursor-pointer transition ${
        active ? "bg-[#EF4444] text-white" : "bg-[#F4F4F5] text-black"
      }`}
    >
      {label}
    </span>
  );
};
