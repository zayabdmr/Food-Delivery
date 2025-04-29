"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddNewCard } from "./AddNewCard";
import { FoodCard } from "./FoodCard";

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
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryId = searchParams.get("categoryId");

  useEffect(() => {
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

    fetchFoods();
  }, []);

  const handleCategoryClick = (id: string | null) => {
    router.push(id ? `?categoryId=${id}` : "/");
  };

  const filteredCategories = categoryId
    ? categories.filter((cat) => cat._id === categoryId)
    : categories;

  const getTotalCount = () =>
    categories.reduce((acc, curr) => acc + curr.foods.length, 0);

  return (
    <div className="bg-white min-h-screen">
      <section className="w-full px-10 py-8">
        <h2 className="text-[22px] font-semibold mb-4">Dishes category</h2>
        <div className="flex gap-2 flex-wrap">
          <CategoryTab
            active={!categoryId}
            label={`All Dishes (${getTotalCount()})`}
            onClick={() => handleCategoryClick(null)}
          />
          {categories.map((cat) => (
            <CategoryTab
              key={cat._id}
              active={categoryId === cat._id}
              label={`${cat.categoryName} (${cat.foods.length})`}
              onClick={() => handleCategoryClick(cat._id)}
            />
          ))}
          <Button className="bg-[#EF4444] text-white rounded-full px-3 h-[32px] text-[14px]">
            <Plus size={16} />
          </Button>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AddNewCard categoryName={category.categoryName} />
                {category.foods.map((food) => (
                  <FoodCard key={food._id} food={food} />
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
}) => (
  <span
    onClick={onClick}
    className={`px-4 py-2 text-[14px] rounded-full cursor-pointer ${
      active ? "bg-[#EF4444] text-white" : "bg-[#F4F4F5] text-black"
    }`}
  >
    {label}
  </span>
);
