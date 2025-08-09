"use client";

import { Minus, Plus, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Food } from "./AddToCart";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { axiosInstance } from "@/lib/utils";

interface DecodedToken {
  userId: string;
  _id: string;
}

export default function MyCart({ items }: { items: Food[] }) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<Food[]>(items);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token) as DecodedToken;
      setUserId(decoded._id);
    }
  }, []);

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

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

  const handleCheckoutClick = () => {
    if (!userId) {
      setShowLoginAlert(true);
    } else {
      handleCheckout();
    }
  };

  const handleCheckout = async () => {
    if (!userId || !cartItems.length) return;
    try {
      await axiosInstance.post("/foodOrder", {
        user: userId,
        totalPrice,
        foods: cartItems,
        deliveryMockAddress: deliveryAddress,
      });
      console.log("Checkout successful");
      localStorage.removeItem("foods");
      setCartItems([]);
    } catch (err) {
      console.error("Checkout failed", err);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-6 bg-[#FFFFFF] rounded-2xl h-fit">
        <h2 className="text-black font-semibold text-xl mb-4">My cart</h2>
        <div className="bg-gray-100 rounded-xl p-8 flex flex-col items-center text-center space-y-3">
          <img src="/logo.png" alt="Empty Cart" className="w-16 h-16" />
          <h1 className="text-lg font-semibold text-black">
            Your cart is empty
          </h1>
          <p className="text-sm text-gray-500">
            Hungry? 🍔 Add some delicious dishes to your cart and satisfy your
            cravings!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-h-[90vh] overflow-y-auto pr-2">
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-[20px] font-semibold text-[#71717A] mb-6">
          My Cart
        </h2>

        <div className="space-y-6">
          {cartItems.map(
            ({ foodName, image, ingredients, quantity, price }) => (
              <div
                key={foodName}
                className="border-b border-dashed pb-6 last:border-none last:pb-0"
              >
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <img
                      src={image || "/placeholder.jpg"}
                      alt={foodName}
                      className="w-full h-full rounded-xl object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                    <div className="flex justify-between items-start">
                      <div className="pr-2">
                        <h3 className="text-red-500 font-bold">{foodName}</h3>
                        <p className="text-black text-sm mt-1">{ingredients}</p>
                      </div>
                      <div
                        onClick={() => removeItem(foodName)}
                        className="bg-transparent p-2 flex items-center justify-center cursor-pointer rounded-full border border-[#EF4444] w-[36px] h-[36px]"
                      >
                        <X className="text-[#EF4444]" />
                      </div>
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
                        ₮{price * quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

          <div className="flex flex-col gap-3 pt-4">
            <h4 className="font-semibold text-[20px] text-gray-500">
              Delivery location
            </h4>
            <Textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Please share your complete address"
              className="min-h-[80px] text-gray-700"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-[20px] gap-5 flex flex-col">
        <p className="text-[20px] font-semibold">Payment info</p>
        <div className="flex justify-between">
          <p className="text-[16px] text-[#71717A]">Items</p>
          <p className="text-[16px] font-bold">₮{totalPrice}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-[16px] text-[#71717A]">Shipping</p>
          <p className="text-[16px] font-bold">₮0.99</p>
        </div>
        <div className="border border-dashed border-[#71717A]" />
        <div className="flex justify-between">
          <p className="text-[16px] text-[#71717A]">Total</p>
          <p className="text-[16px] font-bold">
            ₮{(totalPrice + 0.99).toFixed(2)}
          </p>
        </div>

        <Button
          onClick={handleCheckoutClick}
          className="text-white bg-[#EF4444] rounded-full py-2"
        >
          Checkout
        </Button>
      </div>

      {showLoginAlert && (
        <AlertDialog open={showLoginAlert} onOpenChange={setShowLoginAlert}>
          <AlertDialogContent className="w-[450px]">
            <div className="flex justify-end">
              <button onClick={() => setShowLoginAlert(false)}>
                <X className="w-5 h-5 text-gray-500 hover:text-black" />
              </button>
            </div>
            <AlertDialogHeader className="flex flex-col items-center">
              <AlertDialogTitle className="text-[24px] font-semibold">
                You need to log in first
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-2 mb-4 text-center">
                Please log in or sign up to complete your order.
              </AlertDialogDescription>
              <div className="flex gap-4">
                <Button
                  onClick={() => router.push("/log-in")}
                  className="bg-gray-200 text-black px-6 w-[140px] h-[40px]"
                >
                  Log in
                </Button>
                <Button
                  onClick={() => router.push("/sign-up")}
                  className="bg-gray-200 text-black px-6 w-[140px] h-[40px]"
                >
                  Sign up
                </Button>
              </div>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
