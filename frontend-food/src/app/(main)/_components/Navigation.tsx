"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeliveryAddress } from "./DeliveryAddress";
import { OrderDetail } from "./OrderDetail";

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

export default function Navigation({ cartItems }: { cartItems: Food[] }) {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToLogin = () => router.push("/login");

  const handleToMainPage = () => router.push("/");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserId(null);
    setDeliveryAddress("");
    setIsLoggedIn(false);
    router.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        setUserId(decodedToken._id);
        setDeliveryAddress(decodedToken.address);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-[68px] bg-[#18181B] px-[88px] py-3 flex items-center justify-between">
      <img
        src="nlogo.png"
        alt="Logo"
        onClick={handleToMainPage}
        className="w-[146px] h-[44px] cursor-pointer"
      />

      <div className="flex items-center gap-3">
        <DeliveryAddress
          deliveryAddress={deliveryAddress}
          setDeliveryAddress={setDeliveryAddress}
        />

        <OrderDetail cartItems={cartItems} />

        <Button
          onClick={handleToLogin}
          className="w-[38px] h-[38px] bg-[#EF4444] rounded-full flex items-center justify-center"
        >
          <User className="text-white" />
        </Button>

        {isLoggedIn && (
          <Button
            onClick={handleLogout}
            className="w-[100px] h-[38px] bg-[#EF4444] rounded-full flex items-center justify-center"
          >
            Log out
          </Button>
        )}
      </div>
    </div>
  );
}
