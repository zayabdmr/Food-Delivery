"use client";

import { useState } from "react";

import { Navigation } from "./_components/Navigation";
import FoodCard, { Food } from "../components/FoodCard";

export default function App() {
  const [cartItems, setCartItems] = useState<Food[]>([]);

  const handleAddToCart = (food: Food) => {
    setCartItems((prev) => {
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
      <Navigation cartItems={cartItems} />

      <div className="p-6 flex flex-wrap gap-4 mt-[80px]">
        <FoodCard
          food={{
            foodName: "Pizza Margherita",
            price: 12.99,
            image: "/delivery.png",
            ingredients: "Cheese, Tomato, Basil",
            quantity: 1,
          }}
          onAddToCart={handleAddToCart}
        />

        <FoodCard
          food={{
            foodName: "Burger Deluxe",
            price: 9.5,
            image: "/delivery.png",
            ingredients: "Beef, Cheese, Lettuce",
            quantity: 1,
          }}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}
