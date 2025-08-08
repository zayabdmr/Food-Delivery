"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { User, ShoppingCart } from "lucide-react";
import { DeliveryAddress } from "@/app/components/DeliveryAddress";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MyCart from "@/app/components/MyCart";

// ----------------------
// Types
// ----------------------
interface DecodedToken {
  _id: string;
  address: string;
}

export interface Food {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  quantity: number;
}

// ----------------------
// Main Component
// ----------------------
export const Navigation = ({ cartItems }: { cartItems: Food[] }) => {
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  // ----------------------
  // Handlers
  // ----------------------
  const handleToLogin = () => router.push("/log-in");
  const handleToMainPage = () => router.push("/");

  // ----------------------
  // Init on mount
  // ----------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token);
      setUserId(decodedToken._id);
      setDeliveryAddress(decodedToken.address);
    }
  }, []);

  return (
    <div className="bg-[#18181B] h-[68px] w-full flex items-center justify-between px-[88px] py-3 fixed z-50">
      {/* Logo */}
      <img
        onClick={handleToMainPage}
        src="nlogo.png"
        alt="Logo"
        className="w-[146px] h-[44px] cursor-pointer"
      />

      {/* Right section */}
      <div className="flex items-center gap-3">
        <DeliveryAddress
          deliveryAddress={deliveryAddress}
          setDeliveryAddress={setDeliveryAddress}
        />

        {/* Cart */}
        <Sheet>
          <SheetTrigger className="relative">
            <ShoppingCart className="w-6 h-6 text-white" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </SheetTrigger>
          <SheetContent side="right" className="w-[400px]">
            <MyCart items={cartItems} />
          </SheetContent>
        </Sheet>

        {/* Login button */}
        <Button
          onClick={handleToLogin}
          className="bg-[#EF4444] rounded-full w-[38px] h-[38px] flex items-center justify-center"
        >
          <User className="text-white" />
        </Button>
      </div>
    </div>
  );
};
