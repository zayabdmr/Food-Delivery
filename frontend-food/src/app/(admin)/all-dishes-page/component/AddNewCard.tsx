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
import { Plus, UploadIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { uploadImage } from "../../../../../utils/image-upload";
import axios from "axios";

type Category = {
  _id: string;
  categoryName: string;
};
type AddNewCardProps = {
  category: Category;
};

export const AddNewCard = ({ category }: AddNewCardProps) => {
  const [foodName, setFoodName] = useState();
  const [foodPrice, setFoodPrice] = useState<Number>();
  const [foodIngredients, setFoodIngredients] = useState();
  const [image, setImage] = useState<File>();

  const handleFoodNameChange = (event: any) => {
    setFoodName(event.target.value);
  };
  const handleFoodPriceChange = (event: any) => {
    setFoodPrice(Number(event.target.value));
  };
  const handleFoodIngredientChange = (event: any) => {
    setFoodIngredients(event.target.value);
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setImage(event.target.files[0]);
  };
  const handleAddNewFood = async () => {
    try {
      const imageUrl = await uploadImage(image);
      const newFoodData = {
        foodName: foodName,
        price: foodPrice,
        ingredients: foodIngredients,
        category: [category._id],
        image: imageUrl,
      };
      const respose = await axios.post(
        "http://localhost:8000/food",
        newFoodData
      );
      console.log(respose.data);
    } catch (error) {
      console.log(error);
    }
    console.log({});
  };

  return (
    <div className="w-[270px] h-[241px] flex flex-col justify-center items-center gap-4 border-2 border-dashed border-[#EF4444] rounded-[20px]">
      <Dialog>
        <DialogTrigger>
          <Button className="w-[40px] h-[40px] bg-[#EF4444] rounded-full">
            <Plus className="h-4 w-4" />
          </Button>
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
            <div className="flex flex-col gap-2">
              <Label htmlFor="foodName" className="text-[#09090B]">
                Food name
              </Label>
              <Input
                onChange={handleFoodNameChange}
                id="foodName"
                placeholder="Type food name"
                className="text-[#71717A]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="foodPrice">Food price</Label>
              <Input
                onChange={handleFoodPriceChange}
                id="foodPrice"
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
              onChange={handleFoodIngredientChange}
              id="ingredients"
              placeholder="List ingredients..."
              className="w-full h-[112px] rounded-md border border-gray-300 p-2 resize-none text-[#71717A]"
            />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <Label htmlFor="foodImage" className="text-[#09090B]">
              Food image
            </Label>
            <div className="w-full h-[160px] border-2 border-dashed border-gray-300 flex items-center justify-center text-sm text-gray-500 rounded-md bg-gray-50">
              <div className="text-center">
                <UploadIcon className="mx-auto mb-2" />
                <p className="text-[#18181B] font-medium">
                  Choose a file or drag & drop it here
                </p>
                <input
                  type="file"
                  id="foodImage"
                  className=""
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
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
