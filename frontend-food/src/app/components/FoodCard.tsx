"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export type Food = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  quantity: number;
};

const FoodCard = ({
  food,
  onAddToCart,
}: {
  food: Food;
  onAddToCart: (food: Food) => void;
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));
  const totalPrice = (food.price * quantity).toFixed(2);

  const handleAdd = () => {
    onAddToCart({ ...food, quantity });
    setQuantity(1);
  };

  return (
    <div className="bg-white w-[400px] h-[342px] p-4 rounded-2xl shadow-md relative">
      {/* Image with Dialog */}
      <div className="relative">
        <img
          src={food.image}
          alt={food.foodName}
          className="w-full h-[210px] object-cover rounded-xl"
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button className="absolute bottom-3 right-3 w-10 h-10 bg-[#EF4444] rounded-full flex items-center justify-center">
              <Plus className="text-white" size={18} />
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-white rounded-2xl p-4 max-w-5xl w-fit h-fit overflow-hidden">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left side image */}
              <img
                src={food.image}
                alt={food.foodName}
                className="w-full md:w-[370px] h-[364px] object-cover rounded-xl"
              />

              {/* Right side content */}
              <div className="flex flex-col justify-between flex-1 px-2">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-[#EF4444]">
                    {food.foodName}
                  </h2>

                  <p className="text-sm text-[#52525B] leading-relaxed">
                    {food.ingredients}
                  </p>

                  <div className="flex justify-between items-center mt-10">
                    {/* Total Price */}
                    <div>
                      <p className="text-sm text-[#52525B]">Total price</p>
                      <p className="text-lg font-bold">₮{totalPrice}</p>
                    </div>

                    {/* Quantity control */}
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        onClick={handleDecrement}
                        className="w-10 h-10 rounded-full p-0"
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="font-semibold">{quantity}</span>
                      <Button
                        variant="outline"
                        onClick={handleIncrement}
                        className="w-10 h-10 rounded-full p-0"
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Add to Cart */}
                <Button
                  onClick={handleAdd}
                  className="mt-6 w-full h-11 rounded-full bg-black text-white text-sm font-medium"
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Bottom content */}
      <div className="pt-4 space-y-1">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-[#EF4444]">
            {food.foodName}
          </h3>
          <p className="text-lg text-[#09090B] font-medium">₮{food.price}</p>
        </div>
        <p className="text-sm text-[#52525B] line-clamp-2">
          {food.ingredients}
        </p>
      </div>
    </div>
  );
};

export default FoodCard;
