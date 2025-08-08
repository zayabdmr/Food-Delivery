// ok
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";
import FoodCard from "./FoodCard";

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

export const ProductCard = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
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

  const createOrder = async (foodId: string) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axiosInstance.post(
        "/foodOrder",
        {
          totalPrice: 20000,
          foodOrderItems: [{ food: foodId, quantity: 1 }],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Захиалга амжилттай илгээгдлээ");
      } else {
        console.error("Амжилтгүй:", response.data.message || "Алдаа гарлаа");
      }
    } catch (error) {
      console.error("Захиалга илгээх үед алдаа:", error);
    }
  };

  const filteredCategories = categoryId
    ? categories.filter((cat) => cat._id === categoryId)
    : categories;

  return (
    <div className="bg-[#404040] min-h-screen">
      <section className="w-screen h-[176px] px-[60px] py-[32px] space-y-9">
        <h2 className="pl-[32px] text-white text-[30px] font-semibold">
          Categories
        </h2>

        <div className="flex items-center space-x-4 px-2">
          <div className="flex gap-2 pl-6">
            <span
              onClick={() => handleCategoryClick(null)}
              className={`px-6 py-2 text-[18px] text-center rounded-full cursor-pointer whitespace-nowrap
                ${
                  !categoryId
                    ? "bg-[#EF4444] text-white"
                    : "bg-white text-[#18181B] hover:bg-[#EF4444] hover:text-white"
                }`}
            >
              All
            </span>
            {categories.map((cat) => (
              <span
                key={cat._id}
                onClick={() => handleCategoryClick(cat._id)}
                className={`px-6 py-2 text-[18px] rounded-full cursor-pointer whitespace-nowrap
                  ${
                    categoryId === cat._id
                      ? "bg-[#EF4444] text-white"
                      : "bg-white text-[#18181B] hover:bg-[#EF4444] hover:text-white"
                  }`}
              >
                {cat.categoryName}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-[90px] py-10">
        {loading ? (
          <p className="text-white text-center text-2xl">Loading...</p>
        ) : filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div key={category._id} className="mb-10">
              <h3 className="text-white text-[30px] font-semibold mb-6">
                {category.categoryName}
              </h3>

              <div className="flex gap-6 flex-wrap">
                {category.foods.map((food) => (
                  <FoodCard
                    key={food._id}
                    food={food}
                    // onOrder={() => createOrder(food._id)}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center text-2xl">No foods found.</p>
        )}
      </section>
    </div>
  );
};
