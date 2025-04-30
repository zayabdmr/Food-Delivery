"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image as ImageIcon, X } from "lucide-react";
import { useState, ChangeEvent } from "react";
import { uploadImage } from "../../../../../utils/image-upload";
import { axiosInstance } from "@/lib/utils";
import { Trash } from "lucide-react";

export type Food = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
};

type DialogContentEditProps = {
  food: Food;
  onSave: () => void;
};

export const DialogContentEdit = ({ food, onSave }: DialogContentEditProps) => {
  const [foodName, setFoodName] = useState(food.foodName);
  const [price, setPrice] = useState(food.price);
  const [ingredients, setIngredients] = useState(food.ingredients);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(food.image);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateFood = async () => {
    try {
      let updatedImageUrl = food.image;
      if (imageFile) {
        updatedImageUrl = await uploadImage(imageFile);
      }

      const updatedData = {
        foodName,
        price,
        ingredients,
        image: updatedImageUrl,
      };

      await axiosInstance.put(`/food/${food._id}`, updatedData);
      alert("Dish updated successfully");
      onSave();
    } catch (error) {
      console.error("Failed to update dish:", error);
      alert("Failed to update dish");
    }
  };

  return (
    <div className="space-y-4 ">
      <h2 className="text-[18px] font-semibold text-[#09090B]">Dishes info</h2>

      <div className="flex gap-4">
        <Label className="text-[12px] text-[#71717A] w-[140px]">
          Dish name
        </Label>
        <Input
          className="text-[14px] text-[#09090B]"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        <Label className="text-[12px] text-[#71717A] w-[140px]">
          Dish category
        </Label>
        <Input
          className="text-[14px] text-[#09090B]"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        <Label className="text-[12px] text-[#71717A] w-[140px]">
          Ingredients
        </Label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full h-[112px] rounded-md border border-gray-300 p-2 resize-none text-[#09090B] text-[14px]"
        />
      </div>

      <div className="flex gap-4">
        <Label className="text-[12px] text-[#71717A] w-[140px]">Price</Label>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="text-[14px] text-[#09090B]"
        />
      </div>

      <div className="flex gap-4">
        <Label className="text-[12px] text-[#71717A] w-[140px]">Image</Label>
        {imagePreview ? (
          <div className="relative w-full h-40 rounded-md overflow-hidden">
            <img
              src={imagePreview}
              alt="preview"
              className="object-cover w-full h-full"
            />
            <button
              onClick={() => {
                setImageFile(null);
                setImagePreview("");
              }}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white text-black flex items-center justify-center"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <label
            htmlFor="image"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
          >
            <div className="flex flex-col items-center gap-2">
              <p className="w-[32px] h-[32px] bg-white rounded-full flex justify-center items-center">
                <ImageIcon size={16} />
              </p>
              <p className="text-sm text-gray-500">
                Choose a file or drag & drop it here
              </p>
            </div>
            <input
              id="image"
              type="file"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="pt-4 flex justify-between">
        <Button className="bg-[#FFF border border-red-500">
          <Trash color="red" size={16} />
        </Button>

        <Button
          className="w-[126px] h-[40px] text-[14px] font-medium text-[#FAFAFA]"
          onClick={handleUpdateFood}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};
