"use client";
import { ChevronsUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { axiosInstance, cn } from "@/lib/utils";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Order = {
  _id: string;
  email: string;
  food: string;
  date: Date;
  total: number;
  address: string;
};

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/foodOrder");
        setOrders(response.data.foodOrder);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg w-full max-w-[1171px]">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-[20px] font-bold text-[#09090B]">Orders</p>
          <p className="text-[12px] text-[#71717A]">32 items</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="date"
            className="w-[300px] h-[36px] px-4 py-2 rounded-full border border-[#E4E4E7] text-[14px] text-[#09090B]"
          />
          <Button className="bg-[#18181B] text-white text-[14px] h-[36px] rounded-full px-4">
            Change delivery state
          </Button>
        </div>
      </div>

      <div className="flex items-center px-4 py-2 text-[14px] text-[#71717A] font-medium border-b">
        <Checkbox className="mr-4" />
        <div className="w-[40px] text-[#09090B]">№</div>
        <div className="w-[182px]">Customer</div>
        <div className="w-[160px]">Food</div>
        <div className="w-[160px] flex items-center gap-7">
          <span>Date</span>
          <ChevronsUpDown size={16} className="ml-1" />
        </div>
        <div className="w-[100px]">Total</div>
        <div className="w-[200px]">Delivery Address</div>
        <div className="w-[160px] flex items-center gap-3">
          <span>Delivery state</span>
          <ChevronsUpDown size={16} className="ml-1" />
        </div>
      </div>

      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="flex items-center px-4 py-3 text-[14px] text-[#09090B] border-b hover:bg-gray-50"
        >
          <Checkbox className="mr-4" />
          <div className="w-[40px]">1</div>
          <div className="w-[182px]">Test@gamil.com</div>
          <div className="w-[160px]">2 foods</div>
          <div className="w-[160px]">2024/12/20</div>
          <div className="w-[100px]">$26.97</div>
          <div className="w-[200px] truncate">2024/12/СБД, 12-р хороо...</div>
          <div className="w-[160px]">
            <Select>
              <SelectTrigger className="w-[120px] h-[30px] border rounded-full px-3 text-sm">
                <span
                  className={cn("text-xs", {
                    "text-red-500": index < 3,
                    "text-green-600": index >= 3 && index < 6,
                    "text-gray-500": index >= 6,
                  })}
                >
                  {index < 3
                    ? "Pending"
                    : index < 6
                      ? "Delivered"
                      : "Cancelled"}
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}

      <div className="flex justify-end items-center gap-2 mt-4">
        {Array.from({ length: 10 }, (_, i) => (
          <button
            key={i}
            className={cn(
              "w-8 h-8 rounded-full text-sm",
              i === 0
                ? "bg-[#18181B] text-white"
                : "bg-[#F4F4F5] text-[#18181B]"
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
