"use client";
import { ChevronRight, MapPin, ShoppingCart, User, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useEffect, useState } from "react";
import { CardPackage } from "./CardPackage";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { axiosInstance } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface DecodedToken {
  _id: string;
  address: string;
}

type FoodType = {
  foodName: string;
  price: number;
  image: string;
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

export const Header = ({ deliveryInputRef }: { deliveryInputRef: any }) => {
  const router = useRouter();

  const handleToLogin = () => {
    router.push("/log-in");
  };

  const [userId, setUserId] = useState<string | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [myCartfoods, setMyCartFoods] = useState<FoodType[]>([]);
  const [isSelected, setIsSelected] = useState(0);

  const handleIsSelected = (id: number) => {
    setIsSelected(id);
  };

  const fetchFoods = () => {
    const storedFoods = window.localStorage.getItem("foods");
    const card = storedFoods ? JSON.parse(storedFoods) : [];
    setMyCartFoods(card);
  };

  const fetchAddress = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const requestAddress = {
        address: deliveryAddress,
      };

      await axiosInstance.put(`/user`, requestAddress, {
        headers: {
          authorization: token,
        },
      });
    } catch (error) {
      console.error("Failed to update address", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token);
      setUserId(decodedToken._id);
      setDeliveryAddress(decodedToken.address);
    }
    fetchFoods();
  }, []);

  const duplicatedPage = [<CardPackage />, <CardPackage />][isSelected];

  return (
    <div className="bg-[#18181B] h-[68px] w-full flex items-center justify-between px-[88px] py-3 fixed z-9999">
      <div className="flex gap-3 items-center">
        <img src="nlogo.png" alt="Logo" className="w-[146px] h-[44px]" />
      </div>

      <div className="flex items-center gap-[13px]">
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="flex items-center gap-3 bg-white rounded-full px-3 py-2">
              <MapPin className="text-[#EF4444]" />
              {deliveryAddress ? (
                <p className="text-[#EF4444]">{deliveryAddress}</p>
              ) : (
                <p className="text-[#EF4444]">
                  Delivery address:{" "}
                  <span className="text-[#71717A]">Add location</span>
                </p>
              )}
              <ChevronRight className="text-[#71717A]" />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader className="flex flex-col gap-[24px]">
              <div className="flex justify-between items-center">
                <AlertDialogTitle>Delivery Address</AlertDialogTitle>
                <AlertDialogCancel className="rounded-full h-[36px] w-[36px] border-none bg-gray-200">
                  <X />
                </AlertDialogCancel>
              </div>
              <Textarea
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="h-[112px]"
                placeholder="Please provide specific address details such as building number, entrance, and apartment number"
              />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-[#18181B]"
                onClick={fetchAddress}
              >
                Deliver Here
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-white rounded-full w-[36px] h-[36px] flex items-center justify-center">
              {myCartfoods.length > 0 ? (
                <p className="text-red-700 font-bold">{myCartfoods.length}</p>
              ) : (
                <ShoppingCart className="text-[#18181B]" />
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            style={{ maxWidth: "535px" }}
            className="!w-[645px] pt-20 bg-[#404040] flex flex-col gap-6 overflow-y-scroll"
          >
            <SheetHeader className="flex flex-col gap-6">
              <SheetTitle className="flex gap-2">
                <ShoppingCart className="text-white" />
                <p className="text-white">Order details</p>
              </SheetTitle>
              <SheetDescription className="flex w-full justify-between bg-white p-1 rounded-full">
                <Button
                  onClick={() => handleIsSelected(0)}
                  className={`px-17 rounded-full w-[227px] ${
                    isSelected === 0
                      ? "bg-[#EF4444] text-white"
                      : "bg-white text-black"
                  }`}
                >
                  Cart
                </Button>
                <Button
                  onClick={() => handleIsSelected(1)}
                  className={`px-17 rounded-full w-[227px] ${
                    isSelected === 1
                      ? "bg-[#EF4444] text-white"
                      : "bg-white text-black"
                  }`}
                >
                  Order
                </Button>
              </SheetDescription>
              {duplicatedPage}
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Avatar className="w-[36px] h-[36px]" onClick={handleToLogin}>
          <AvatarImage src="" alt="@avatar" />
          <AvatarFallback className="bg-[#EF4444]">
            <User className="text-white" />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
