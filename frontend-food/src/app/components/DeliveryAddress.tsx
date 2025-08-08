"use client";

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
import { ChevronRight, MapPin, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/lib/utils";

export const DeliveryAddress = ({
  deliveryAddress,
  setDeliveryAddress,
}: {
  deliveryAddress: string;
  setDeliveryAddress: (val: string) => void;
}) => {
  const fetchAddress = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const requestAddress = { address: deliveryAddress };
      await axiosInstance.put(`/user`, requestAddress, {
        headers: { authorization: token },
      });
    } catch (error) {
      console.error("Failed to update address", error);
    }
  };

  return (
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
          <AlertDialogAction className="bg-[#18181B]" onClick={fetchAddress}>
            Deliver Here
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
