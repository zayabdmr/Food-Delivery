"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";
import { Plus, Minus, ChevronLeft, Badge, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type WithCategory = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
};
type AllData = {
  categoryName: string;
  foods: WithCategory[];
};
type Data = {
  foods: AllData[];
};

export const ProductCard = () => {
  const [foods, setFoods] = useState<Data>();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const fetchFoods = async () => {
    console.log("working....");
    setLoading(true);
    try {
      const url = categoryId
        ? `/food/category/?categoryId=${categoryId}`
        : "/food/category/";
      const response = await axiosInstance.get(url);
      console.log("Fetched foods:", response.data);
      setFoods(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
      setFoods({ foods: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [categoryId]);
  console.log(foods?.foods[0], "hh");
  return (
    <div>
      <div className="w-screen h-[176px] px-[48px] py-[32px] bg-[#404040] space-y-9">
        <h2 className="pl-[30px] text-[#FFF] text-[30px] font-semibold">
          Categories
        </h2>

        <div className="flex space-y-2 items-center">
          <button className="p-4 text-white hover:bg-gray-600 rounded-full">
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-[10px]">
            {foods ? (
              foods.foods.map((data, index) => (
                <div
                  key={index}
                  className="flex items-center h-[36px] gap-1 px-3 py-2 text-[18px] text-[#18181B] bg-[#FFF] border-[#D4D4D8] rounded-full font-normal hover:bg-[#EF4444] cursor-pointer"
                >
                  {data.categoryName}
                </div>
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

      <div className="px-[88px] bg-[#404040] min-h-screen">
        {loading ? (
          <div className="text-white text-center py-10 text-2xl">
            Loading...
          </div>
        ) : (
          <div className="py-10">
            <h2 className="text-[#FFF] text-[30px] font-semibold py-6">
              {foods?.foods.map((data, index) => {
                return (
                  <div key={index}>
                    <h1>{data.categoryName}</h1>
                    <div className="flex gap-6 flex-wrap">
                      {data.foods.map((food, index) => {
                        return (
                          <div
                            key={index}
                            className="bg-[#FFF] w-[398px] h-[342px] p-[16px] rounded-[20px] relative overflow-hidden"
                          >
                            <div className="relative">
                              <img
                                className="w-[365px] h-[210px] rounded-[12px] object-cover"
                                src={food.image}
                                alt={food.foodName}
                              />

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button className="absolute w-[40px] !h-[40px] bg-[#EF4444] flex justify-center items-center rounded-full bottom-[12px] right-[12px] shadow-md">
                                    <Plus className="text-white" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="md:max-w-[826px] md:max-h-[512px]">
                                  <DialogTitle></DialogTitle>
                                  <DialogContentInner food={food} />
                                </DialogContent>
                              </Dialog>
                            </div>

                            <div className="font-semibold flex items-center justify-between pt-[20px] pb-[8px]">
                              <h3 className="text-[#EF4444] text-[20px]">
                                {food.foodName}
                              </h3>
                              <p className="text-[#09090B] text-[18px] font-medium">
                                ₮{food.price}
                              </p>
                            </div>
                            <p className="text-[#09090B] text-[14px] font-normal leading-snug line-clamp-2">
                              {food.ingredients}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

const DialogContentInner = ({ food }: { food: food }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex gap-7">
      <img
        src={food.image}
        className="w-[377px] h-[364px] rounded-xl object-cover"
        alt={food.foodName}
      />
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-[30px] font-semibold text-[#EF4444]">
            {food.foodName}
          </h2>
          <p className="text-[#09090B] text-[16px] mb-35">{food.ingredients}</p>
          <div className="flex justify-between">
            <div>
              <p className="text-[#09090B] text-sm">Total price</p>
              <h3 className="text-[24px] font-semibold text-[#09090B] mb-4">
                ₮{food.price * quantity}
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleDecrement}
                className="w-[44px] h-[44px] rounded-full"
              >
                <Minus size={16} />
              </Button>
              <span className="text-[18px] font-semibold">{quantity}</span>
              <Button
                variant="outline"
                onClick={handleIncrement}
                className="w-[44px] h-[44px] rounded-full"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
        </div>
        <Button className="w-[377px] h-[44px] rounded-full flex justify-center items-center font-medium text-white bg-black">
          Add to cart
        </Button>
      </div>
    </div>
  );
};
