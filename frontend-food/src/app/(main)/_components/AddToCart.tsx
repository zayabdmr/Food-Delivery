"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

export type Food = {
  _id?: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  quantity: number;
};

type Props = {
  food: Food;
  onAddToCart: (food: Food) => void;
};

const AddToCart = ({ food, onAddToCart }: Props) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  const totalPrice = (food.price * quantity).toFixed(2);

  const handleAdd = () => {
    onAddToCart({ ...food, quantity });
    setQuantity(1);
  };

  return (
    <div className="relative w-[400px] h-[342px] bg-white rounded-2xl shadow-md p-4">
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

          <DialogTitle className="sr-only">Cart</DialogTitle>

          <DialogContent className="bg-white rounded-2xl p-4 max-w-5xl w-fit h-fit overflow-hidden">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={food.image}
                alt={food.foodName}
                className="w-full md:w-[370px] h-[364px] object-cover rounded-xl"
              />

              <div className="flex flex-col justify-between flex-1 px-2 pt-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#EF4444]">
                    {food.foodName}
                  </h2>

                  <p className="text-sm text-[#52525B] leading-relaxed">
                    {food.ingredients}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mt-10">
                    <div>
                      <p className="text-sm text-[#52525B]">Total price</p>
                      <p className="text-lg font-bold">₮{totalPrice}</p>
                    </div>

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

                  <Button
                    onClick={handleAdd}
                    className="mt-6 w-full h-11 rounded-full bg-black text-white text-sm font-medium"
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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

export default AddToCart;
