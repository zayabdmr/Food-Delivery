"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useRouter } from "next/navigation";
import { SheetClose } from "@/components/ui/sheet";
import { X } from "lucide-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { axiosInstance } from "@/lib/utils";

type FoodType = {
  foodName: string;
  price: number;
  image: string | null;
  ingredients: string;
  deliveryMockAddress: string;
  isAdminPage: boolean;
  foodPackageId: string;
  category: {
    _id: string;
    categoryName: string;
  };
  quantity: number;
};

interface DecodedToken {
  userId: string;
  _id: string;
}

export const CardPackage = () => {
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(0);
  const [myCartfoods, setMyCartFoods] = useState<FoodType[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchFoods = () => {
    const storedFoods = window.localStorage.getItem("foods");
    const card = storedFoods ? JSON.parse(storedFoods) : [];
    setMyCartFoods(card);

    const total = card.reduce(
      (sum: number, food: FoodType) => sum + food.price * food.quantity,
      0
    );
    setTotalPrice(total);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token) as DecodedToken;
      setUserId(decoded._id);
    }
    fetchFoods();
  }, []);

  const handleCheckout = async () => {
    if (!userId || !myCartfoods.length) return;
    try {
      await axiosInstance.post("/foodOrder", {
        user: userId,
        totalPrice,
        foods: myCartfoods,
      });
      console.log("Checkout successful");
      console.log(myCartfoods, "myCartfoods");
      localStorage.removeItem("foods");
      fetchFoods();
    } catch (err) {
      console.error("Checkout failed", err);
    }
  };

  const handleIncreaseQuantity = (index: number) => {
    const storedFoods = window.localStorage.getItem("foods");
    const card = storedFoods ? JSON.parse(storedFoods) : [];

    const newCard = card.map((food: any, i: number) => {
      if (i === index) {
        if (food.quantity > 0) {
          return { ...food, quantity: food.quantity + 1 };
        }
      }
      return food;
    });
    window.localStorage.setItem("foods", JSON.stringify(newCard));
    const newTotalPrice = newCard.reduce(
      (total: number, food: any) => total + food.price * food.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
    fetchFoods();
  };

  const handleDecreaseQuantity = (index: number) => {
    const storedFoods = window.localStorage.getItem("foods");
    const card = storedFoods ? JSON.parse(storedFoods) : [];

    const newCard = card.map((food: any, i: number) => {
      if (i === index) {
        if (food.quantity > 1) {
          return { ...food, quantity: food.quantity - 1 };
        }
      }
      return food;
    });
    window.localStorage.setItem("foods", JSON.stringify(newCard));
    const newTotalPrice = newCard.reduce(
      (total: number, food: any) => total + food.price * food.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
    fetchFoods();
  };

  const deleteFoodFromCart = (index: number) => {
    const storedFoods = window.localStorage.getItem("foods");
    const card = storedFoods ? JSON.parse(storedFoods) : [];

    const updatedCard = card.filter((_: any, i: number) => i !== index);

    window.localStorage.setItem("foods", JSON.stringify(updatedCard));

    fetchFoods();
  };

  return (
    <div>
      <div className="flex flex-col gap-6 ">
        <div className="w-full bg-white p-4 rounded-[20px] gap-5 flex flex-col">
          <p className="text-[20px] font-semibold">My cart</p>
          {myCartfoods.map((value, index) => {
            return (
              <div key={index} className="flex gap-[10px]">
                <Image
                  width={124}
                  height={100}
                  className="w-[124px] h-[124px] bg-filled rounded-[12px]"
                  alt="images"
                  src={value.image || ""}
                ></Image>

                <div className="flex flex-col justify-between">
                  <div className="flex gap-[10px]">
                    <div>
                      <p className="text-[16px] font-bold text-[#EF4444]">
                        {value.foodName}
                      </p>
                      <p className="text-[12px]">{value.ingredients}</p>
                    </div>
                    <div
                      onClick={() => deleteFoodFromCart(index)}
                      className="bg-transparent p-2 flex items-center justify-center cursor-pointer rounded-full border border-[#EF4444] w-[36px] h-[36px]"
                    >
                      <X className="text-[#EF4444]" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <div
                        onClick={() => handleDecreaseQuantity(index)}
                        className=" cursor-pointer bg-transparent border-none text-black shadow-none"
                      >
                        -
                      </div>
                      <p className="text-[18px] font-semibold">
                        {value.quantity || 1}
                      </p>
                      <div
                        onClick={() => handleIncreaseQuantity(index)}
                        className="cursor-pointer bg-transparent border-none text-black shadow-none"
                      >
                        +
                      </div>
                    </div>
                    <p className="text-[16px] font-bold">${value.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <SheetClose className="w-full">
            <div className="w-full">
              <div className="py-2 cursor-pointer w-full bg-transparent border border-[#EF4444] text-[#EF4444] rounded-full">
                Add food
              </div>
            </div>
          </SheetClose>
        </div>
        <div className="bg-white p-4 rounded-[20px] gap-5 flex flex-col">
          <p className="text-[20px] font-semibold">Payment info</p>
          <div className="flex justify-between">
            <p className="text-[16px] text-[#71717A] ">Items</p>
            <p className="text-[16px] font-bold">${Math.floor(totalPrice)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[16px] text-[#71717A] ">Shipping</p>
            <p className="text-[16px] font-bold">$0.99</p>
          </div>
          <div className="border border-dashed border-[#71717A] "></div>
          <div className="flex justify-between">
            <p className="text-[16px] text-[#71717A] ">Total</p>
            <p className="text-[16px] font-bold">
              ${Math.floor(totalPrice + 0.99)}
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger
              asChild
              className="text-white bg-[#EF4444] rounded-full py-2"
            >
              <div onClick={handleCheckout} className="w-full text-center">
                Checkout
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="">
              <AlertDialogHeader className="flex flex-col items-center justify-center">
                <AlertDialogTitle>
                  Your order has been successfully placed !
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <Image
                    alt="image"
                    width={156}
                    height={265}
                    className="w-[156px] h-[265px]"
                    src="/illustration.png"
                  ></Image>
                </AlertDialogDescription>
                <AlertDialogCancel className="rounded-full bg-gray-200 px-8 text-[14px]">
                  Close
                </AlertDialogCancel>
              </AlertDialogHeader>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default CardPackage;
