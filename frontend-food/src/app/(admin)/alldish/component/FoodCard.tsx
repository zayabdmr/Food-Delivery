"use client";

import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogContentEdit } from "./DialogContentEdit";

type Food = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
};

type FoodCardProps = {
  food: Food;
  refetchDishes: () => void;
};

export const FoodCard = ({ food, refetchDishes }: FoodCardProps) => {
  return (
    <div className="w-[300px] h-[241px] bg-white border border-gray-200 rounded-[20px] p-4 relative overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative">
        <img
          src={food.image}
          alt={food.foodName}
          className="w-full h-[129px] object-cover rounded-[12px]"
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button className="absolute bottom-3 right-3 w-10 h-10 bg-[#EF4444] rounded-full shadow-md flex items-center justify-center">
              <Pencil className="text-white" size={16} />
            </Button>
          </DialogTrigger>

          <DialogContent className="w-[475px] h-[595px]">
            <DialogTitle className="text-lg font-semibold text-[#09090B]">
              Dishes info
            </DialogTitle>
            <DialogContentEdit food={food} onSave={refetchDishes} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="pt-4 pb-1 flex items-center justify-between font-semibold">
        <h4 className="text-[#EF4444] text-base">{food.foodName}</h4>
        <p className="text-[#09090B] text-base">₮{food.price}</p>
      </div>

      <p className="text-sm text-[#71717A] leading-tight line-clamp-2">
        {food.ingredients}
      </p>
    </div>
  );
};
