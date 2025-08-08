"use client";

import { useEffect, useState } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import FoodCard, { Food } from "@/app/components/FoodCard";

export const FoodList = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [cart, setCart] = useState<Food[]>([]);

  // API-ээс хоолны жагсаалт татах
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/foods"); // backend API
        const data = await res.json();
        setFoods(data);
      } catch (err) {
        console.error("Хоолны жагсаалт татаж чадсангүй:", err);
      }
    };

    fetchFoods();
  }, []);

  // Add to cart
  const handleAddToCart = (food: Food) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.foodName === food.foodName);
      if (existing) {
        return prev.map((item) =>
          item.foodName === food.foodName
            ? { ...item, quantity: item.quantity + food.quantity }
            : item
        );
      }
      return [...prev, food];
    });
  };

  return (
    <div>
      {/* Sheet Trigger */}
      <div className="flex justify-end mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">🛒 Cart ({cart.length})</Button>
          </SheetTrigger>
          <SheetContent>
            <h2 className="text-lg font-bold mb-4">Your Cart</h2>
            {cart.length === 0 ? (
              <p className="text-gray-500">No items yet</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <span>
                      {item.foodName} x {item.quantity}
                    </span>
                    <span>₮{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>

      {/* Хоолны жагсаалт */}
      <div className="grid grid-cols-2 gap-4">
        {foods.map((food, index) => (
          <FoodCard key={index} food={food} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};
