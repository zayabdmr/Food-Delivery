"use client";

import { useState, ChangeEvent } from "react";
import { Plus, Image } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";

import { uploadImage } from "../../../../../utils/image-upload";
import { axiosInstance } from "@/lib/utils";

type Category = {
  _id: string;
  categoryName: string;
};

type AddNewCardProps = {
  category: Category;
  refetchDishes: () => Promise<void>;
};

export const AddNewCard = ({ category, refetchDishes }: AddNewCardProps) => {
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState<number | "">("");
  const [foodIngredients, setFoodIngredients] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleAddNewFood = async () => {
    if (!foodName || !foodPrice || !foodIngredients || !image) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const imageUrl = await uploadImage(image);

      const newFood = {
        foodName,
        price: Number(foodPrice),
        ingredients: foodIngredients,
        category: [category._id],
        image: imageUrl,
      };

      await axiosInstance.post("/food", newFood);
      await refetchDishes();
    } catch (error) {
      console.error("Failed to add new food:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-[271px] h-[241px] flex flex-col items-center justify-center gap-6 border-2 border-dashed border-[#EF4444] rounded-[20px] cursor-pointer">
          <div className="w-10 h-10 bg-[#EF4444] rounded-full flex items-center justify-center">
            <Plus className="h-4 w-4 text-white" />
          </div>
          <div className="text-center text-[#18181B] text-sm">
            <p>Add new Dish to</p>
            <p>{category.categoryName}</p>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            <p className="text-[#09090B] text-lg font-semibold">
              Add new Dish to {category.categoryName}
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-6 py-4 text-sm">
          <div className="flex flex-col gap-2 w-1/2">
            <Label htmlFor="foodName">Food name</Label>
            <Input
              id="foodName"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="Type food name"
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <Label htmlFor="foodPrice">Food price</Label>
            <Input
              id="foodPrice"
              value={foodPrice}
              onChange={(e) => setFoodPrice(Number(e.target.value))}
              type="number"
              placeholder="Enter price..."
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 pb-4">
          <Label htmlFor="ingredients">Ingredients</Label>
          <textarea
            id="ingredients"
            value={foodIngredients}
            onChange={(e) => setFoodIngredients(e.target.value)}
            placeholder="List ingredients..."
            className="w-full h-[112px] rounded-md border border-gray-300 p-2 resize-none text-sm text-[#71717A]"
          />
        </div>

        <div className="flex flex-col gap-2 pb-4">
          <Label htmlFor="foodImage">Food image</Label>
          <label
            htmlFor="foodImage"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Image size={16} />
              </span>
              <p className="text-sm text-[#18181B] font-medium">
                Choose a file or drag & drop
              </p>
            </div>
            <input
              id="foodImage"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <DialogFooter>
          <Button onClick={handleAddNewFood} className="text-white font-medium">
            Add Dish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
