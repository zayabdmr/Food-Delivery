"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export type Food = {
  foodName: string;

  price: number;
  image: string;
  ingredients: string;
};

type DialogContentEditProps = {
  food: Food;
};

export const DialogContentEdit = ({ food }: DialogContentEditProps) => {
  const [quantity, setQuantity] = useState(1);

  const totalPrice = food.price * quantity;

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
          <p className="text-[#09090B] text-[16px] pb-40">{food.ingredients}</p>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-[#09090B] text-[16px]">Total price</p>
              <h3 className="text-[24px] font-semibold text-[#09090B] pb-4">
                ₮{totalPrice}
              </h3>
            </div>
            <div className="flex items-center gap-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogContentEdit;
