"use client";

import React, { useState } from "react";
import MyCart from "./MyCart";
import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Food } from "./AddToCart";

interface OrderDetailProps {
  cartItems: Food[];
}

export const OrderDetail: React.FC<OrderDetailProps> = ({ cartItems }) => {
  const [isSelected, setIsSelected] = useState(0);

  const handleIsSelected = (index: number) => {
    setIsSelected(index);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative w-9 h-9 rounded-full bg-white hover:bg-black transition-colors">
          <ShoppingCart className="w-4 h-4 text-black hover:text-white transition-colors" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="bg-[#404040] p-6 w-[500px]">
        <SheetTitle className="flex items-center gap-2 text-white text-[20px] font-semibold mb-4">
          <ShoppingCart /> Order detail
        </SheetTitle>

        <div className="flex w-full justify-between bg-white p-1 rounded-full mb-6">
          <Button className={`rounded-full w-full bg-red-500`}>Cart</Button>
        </div>

        <MyCart items={cartItems} />
      </SheetContent>
    </Sheet>
  );
};
