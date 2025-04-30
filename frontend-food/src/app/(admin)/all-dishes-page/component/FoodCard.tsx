"use client";

import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DialogContentInner from "@/app/components/DialogContentInner";
import DialogContentEdit from "./DialogContentEdit";

type Food = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
};

export const FoodCard = ({ food }: { food: Food }) => {
  return (
    <div className="bg-white border border-gray-200 w-full h-[342px] p-4 rounded-[20px] relative overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative">
        <img
          src={food.image}
          alt={food.foodName}
          className="w-full h-[210px] rounded-[12px] object-cover"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="absolute bottom-3 right-3 w-[40px] h-[40px] bg-[#EF4444] rounded-full shadow-md flex justify-center items-center">
              <Pencil className="text-white" size={16} />
            </Button>
          </DialogTrigger>
          <DialogContent className="md:max-w-[826px] md:max-h-[512px]">
            <DialogTitle>Edit Dish</DialogTitle>
            <DialogContentEdit food={food} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="pt-4 pb-1 flex justify-between items-center font-semibold">
        <h4 className="text-[#EF4444] text-[16px]">{food.foodName}</h4>
        <p className="text-[#09090B] text-[16px]">₮{food.price}</p>
      </div>
      <p className="text-[#71717A] text-[14px] leading-tight line-clamp-2">
        {food.ingredients}
      </p>
    </div>
  );
};
