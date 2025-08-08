"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Food } from "./FoodCard";
import { useState, useEffect } from "react";

export default function MyCart({ items }: { items: Food[] }) {
  const [cartItems, setCartItems] = useState<Food[]>(items);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  useEffect(() => {
    setCartItems(items);
  }, [items]);

  const updateQuantity = (name: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.foodName === name
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (name: string) => {
    setCartItems((prev) => prev.filter((item) => item.foodName !== name));
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-100 rounded-2xl p-8 flex flex-col gap-2">
        <div className=" justify-center flex items-center">
          <img src="logo.png" alt="Logo" className="w-[61px] h-[50px]" />
        </div>
        <h1 className="text-black font-semibold text-[20px] text-center">
          Your cart is empty
        </h1>
        <p className="text-gray-500 text-center">
          Hungry? 🍔 Add some delicious dishes to your cart!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-[20px] font-semibold text-black mb-6">My Cart</h2>

      <div className="space-y-6">
        {cartItems.map(({ foodName, image, ingredients, quantity, price }) => (
          <div
            key={foodName}
            className="border-b border-dashed pb-6 last:border-none last:pb-0"
          >
            <div className="flex gap-4">
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={image}
                  alt={foodName}
                  fill
                  className="rounded-xl object-cover"
                  sizes="96px"
                />
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-red-500 font-bold">{foodName}</h3>
                    <p className="text-black text-sm mt-1">{ingredients}</p>
                  </div>
                  <button
                    onClick={() => removeItem(foodName)}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-red-300 text-red-500 hover:bg-red-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2 border rounded-full px-3 py-1">
                    <button onClick={() => updateQuantity(foodName, -1)}>
                      <Minus className="w-4 h-4 text-black" />
                    </button>
                    <span className="w-6 text-center font-semibold text-sm text-black">
                      {quantity}
                    </span>
                    <button onClick={() => updateQuantity(foodName, 1)}>
                      <Plus className="w-4 h-4 text-black" />
                    </button>
                  </div>
                  <p className="font-semibold text-black">
                    ₮{(price * quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Address */}
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-gray-500">Delivery location</h4>
          <Textarea
            placeholder="Please share your complete address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="min-h-[80px] text-gray-500"
          />
        </div>
      </div>
    </div>
  );
}
