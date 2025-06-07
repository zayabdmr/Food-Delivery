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

type DialogContentInnerProps = {
  food: Food;
};

export const DialogContentInner = ({ food }: DialogContentInnerProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const totalPrice = food.price * quantity;

  return (
    <div>
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
            <p className="text-[#09090B] text-[16px] pb-40">
              {food.ingredients}
            </p>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-[#09090B] text-[16px]">Total price</p>
                <h3 className="text-[24px] font-semibold text-[#09090B] pb-4">
                  ₮{totalPrice}
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

          <Button
            onClick={handleAddToCart}
            className="w-[377px] h-[44px] rounded-full flex justify-center items-center font-medium text-white bg-black"
          >
            Add to cart
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white w-[664px] h-[320px] p-6 rounded-xl shadow-xl flex flex-col items-center justify-center text-center">
            <h2 className="text-[24px] font-semibold text-[#09090B] mb-8">
              Please select your delivery address!
            </h2>
            <img
              src="/logo.png"
              alt="Delivery Logo"
              className="w-[142px] h-[116px] mb-8"
            />
            <Button
              variant="outline"
              className="w-[134px] h-[44px] rounded-full bg-[#F4F4F5]"
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DialogContentInner;
