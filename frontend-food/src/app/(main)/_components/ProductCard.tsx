"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DialogContentInner from "./DialogContentInner";

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

  const handleCategoryClick = (id: string) => {
    router.push(`?categoryId=${id}`);
  };

  const filteredCategories = categoryId
    ? categories.filter((cat) => cat._id === categoryId)
    : categories;

  const createOrder = async (foodId: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.post(
        "/foodOrder",
        {
          totalPrice: 20000,
          foodOrderItems: [
            {
              food: foodId,
              quantity: 1,
            },
          ],
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

  return (
    <div className="bg-[#404040] min-h-screen">
      <section className="w-screen h-[176px] px-[48px] py-[32px] space-y-9">
        <h2 className="pl-[30px] text-white text-[30px] font-semibold">
          Categories
        </h2>
        <div className="flex items-center space-x-4">
          <ChevronButton direction="left" />
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <span
                  key={cat._id}
                  onClick={() => handleCategoryClick(cat._id)}
                  className={`px-3 py-2 text-[18px] rounded-full cursor-pointer whitespace-nowrap
                    ${
                      categoryId === cat._id
                        ? "bg-[#EF4444] text-white"
                        : "bg-white text-[#18181B] hover:bg-[#EF4444] hover:text-white"
                    }`}
                >
                  {cat.categoryName}
                </span>
              ))
            ) : (
              <p className="text-[#71717A]">No categories available</p>
            )}
          </div>
          <ChevronButton direction="right" />
        </div>
      </section>

      <section className="px-[88px] py-10">
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
                    onOrder={() => createOrder(food._id)}
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

const ChevronButton = ({ direction }: { direction: "left" | "right" }) => {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button className="p-4 text-white hover:bg-gray-600 rounded-full">
      <Icon size={16} />
    </button>
  );
};

const FoodCard = ({ food, onOrder }: { food: Food; onOrder: () => void }) => {
  return (
    <div className="bg-white w-100 h-[342px] p-4 rounded-[20px] relative overflow-hidden">
      <div className="relative">
        <img
          src={food.image}
          alt={food.foodName}
          className="w-full h-[210px] rounded-[12px] object-cover"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="absolute bottom-3 right-3 w-[40px] h-[40px] bg-[#EF4444] rounded-full shadow-md flex justify-center items-center">
              <Plus className="text-white" />
            </Button>
          </DialogTrigger>
          <DialogContent className="md:max-w-[826px] md:max-h-[512px]">
            <DialogTitle>{food.foodName}</DialogTitle>
            <DialogContentInner food={food} />
            <div className="mt-4 flex justify-end">
              <Button onClick={onOrder} className="bg-[#EF4444] text-white">
                Захиалах
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="pt-[10px] pb-2 flex justify-between items-center font-semibold">
        <h3 className="text-[#EF4444] text-[24px] leading-8">
          {food.foodName}
        </h3>
        <p className="text-[#09090B] text-[18px] leading-7">₮{food.price}</p>
      </div>
      <p className="text-[#09090B] text-[14px] leading-5">{food.ingredients}</p>
    </div>
  );
};
