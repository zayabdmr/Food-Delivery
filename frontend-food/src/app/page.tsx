"use client";

import { Suspense, useState } from "react";
import { Food } from "./(main)/_components/AddToCart";
import Navigation from "./(main)/_components/Navigation";
import { ProductCard } from "./(main)/_components/ProductCard";
import { Footer } from "./(main)/_components/Footer";

export default function Home() {
  const [cartItems, setCartItems] = useState<Food[]>([]);

  const handleAddToCart = (food: Food) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.foodName === food.foodName
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.foodName === food.foodName
            ? { ...item, quantity: item.quantity + food.quantity }
            : item
        );
      }

      return [...prevItems, food];
    });
  };

  return (
    <Suspense
      fallback={<div className="text-center mt-10 text-white">Loading...</div>}
    >
      <Navigation cartItems={cartItems} />

      <div className="w-full">
        <img
          src="specialOffer.png"
          alt="Special Offer"
          className="w-screen h-[570px] object-cover"
        />

        <ProductCard onAddToCart={handleAddToCart} />
      </div>
      <Footer />
    </Suspense>
  );
}
