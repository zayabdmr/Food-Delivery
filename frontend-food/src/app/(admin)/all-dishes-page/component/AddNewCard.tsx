"use client";

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
import { Label } from "@radix-ui/react-label";
import { Plus, Image } from "lucide-react";
import { ChangeEvent, useState } from "react";
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
  const [foodName, setFoodName] = useState<String>();
  const [foodPrice, setFoodPrice] = useState<Number>();
  const [foodIngredients, setFoodIngredients] = useState<String>();
  const [image, setImage] = useState<File>();

  const handleFoodNameChange = (event: any) => {
    setFoodName(String(event.target.value));
  };
  const handleFoodPriceChange = (event: any) => {
    setFoodPrice(Number(event.target.value));
  };
  const handleFoodIngredientChange = (event: any) => {
    setFoodIngredients(String(event.target.value));
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setImage(event.target.files[0]);
  };

  const handleAddNewFood = async () => {
    try {
      if (!foodName || !foodPrice || !foodIngredients || !image) {
        alert("Please fill in all fields.");
        return;
      }

      const imageUrl = await uploadImage(image);

      const newFoodData = {
        foodName,
        price: foodPrice,
        ingredients: foodIngredients,
        category: [category._id],
        image: imageUrl,
      };

      const response = await axiosInstance.post("/food", newFoodData);
      console.log("New food added:", response.data);

      await refetchDishes();
    } catch (error) {
      console.error("Failed to add new food:", error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="w-[271px] h-[241px] flex flex-col justify-center items-center gap-6 border-2 border-dashed border-[#EF4444] rounded-[20px] cursor-pointer">
            <div className="w-[40px] h-[40px] bg-[#EF4444] rounded-full flex items-center justify-center">
              <Plus className="h-4 w-4 text-white" />
            </div>
            <div className="text-center text-[#18181B] text-[14px] font-medium">
              <p>Add new Dish to</p>
              <p>{category.categoryName}</p>
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              <p className="mt-4 text-[#09090B] text-[18px] font-semibold">
                Add new Dish to {category.categoryName}
              </p>
            </DialogTitle>
          </DialogHeader>

          <div className="flex gap-4 py-4 text-[14px]">
            <div className="flex flex-col gap-2 w-1/2">
              <Label htmlFor="foodName" className="text-[#09090B]">
                Food name
              </Label>
              <Input
                id="foodName"
                onChange={handleFoodNameChange}
                placeholder="Type food name"
                className="text-[#71717A]"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <Label htmlFor="foodPrice">Food price</Label>
              <Input
                id="foodPrice"
                onChange={handleFoodPriceChange}
                type="number"
                placeholder="Enter price..."
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <Label htmlFor="ingredients" className="text-[#09090B]">
              Ingredients
            </Label>
            <textarea
              id="ingredients"
              onChange={handleFoodIngredientChange}
              placeholder="List ingredients..."
              className="w-full h-[112px] rounded-md border border-gray-300 p-2 resize-none text-[#71717A]"
            />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <Label htmlFor="foodImage" className="text-[#09090B]">
              Food image
            </Label>

            <div className="mb-4">
              <div className="flex justify-center items-center w-full">
                <label
                  htmlFor="foodImage"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
                >
                  <div className="flex flex-col items-center justify-center gap-4">
                    <p className="w-[32px] h-[32px] bg-[#FFF] rounded-full flex justify-center items-center">
                      <Image size={16} />
                    </p>
                    <p className="text-[#18181B] text-[14px] font-medium">
                      Choose a file or drag & drop it here
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
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              className="text-[#FAFAFA] font-medium"
              onClick={handleAddNewFood}
            >
              Add Dish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
