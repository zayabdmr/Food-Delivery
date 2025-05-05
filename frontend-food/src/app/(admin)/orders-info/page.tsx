"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";
import { Avatar } from "./components/Avatar";
import { Input } from "@/components/ui/input";

type Order = {
  _id: string;
  user?: {
    email?: string;
    address?: string;
  };
  foodOrderItems: {
    food: string;
    quantity: number;
  }[];
  createdAt: string;
  totalPrice: number;
  status: string;
};

export default function Admin() {
  const [data, setData] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const getOrders = async () => {
    try {
      const response = await axiosInstance.get("/foodOrder");
      setData(response.data.data);
    } catch (error) {
      console.error("Захиалгуудыг авах үед алдаа гарлаа:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="bg-[#F4F4F5] min-h-screen w-[1380px]  py-6">
      <div className="max-w-[1200px] mx-auto space-y-6">
        <div className="flex justify-end">
          <Avatar />
        </div>

        <div className="flex items-center justify-between bg-white rounded-[8px] px-6 py-4">
          <div>
            <h1 className="text-[#09090B] text-[20px] font-bold ">Orders</h1>
            <div className="text-[12px] text-[#71717A] font-medium">
              {data.length} items
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Input
              type="date"
              className="w-[300px] h-[36px] rounded-full border-[#E4E4E7]"
            ></Input>

            <button className="bg-[#b6b6ba] w-[179px] h-[36px] hover:bg-[#070707] text-[14px] text-[#FAFAFA] flex justify-center items-center rounded-full font-medium">
              Change delivery state
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="text-[#6B7280] text-[14px] font-medium">
                <TableHead>
                  <input type="checkbox" />
                </TableHead>
                <TableHead>№</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Food</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Delivery Address</TableHead>
                <TableHead>Delivery state</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.length > 0 ? (
                currentItems.map((order, index) => (
                  <TableRow key={order._id} className="text-sm">
                    <TableCell>
                      <input type="checkbox" />
                    </TableCell>
                    <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                    <TableCell>{order.user?.email || "Unknown"}</TableCell>
                    <TableCell>
                      <HoverCard>
                        <HoverCardTrigger className="underline cursor-pointer text-blue-600">
                          {order.foodOrderItems.length} foods
                        </HoverCardTrigger>
                        <HoverCardContent className="bg-white border p-3 rounded-lg shadow-md w-60 space-y-2">
                          {order.foodOrderItems.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-center space-x-2"
                            >
                              <img
                                src="/placeholder-food.jpg"
                                alt="food"
                                className="w-8 h-8 rounded"
                              />
                              <span className="truncate">{item.food}</span>
                              <span className="text-sm text-gray-500">
                                x{item.quantity}
                              </span>
                            </div>
                          ))}
                        </HoverCardContent>
                      </HoverCard>
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>₮{order.totalPrice}</TableCell>
                    <TableCell>{order.user?.address || "Unknown"}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "Pending"
                            ? "text-[#E05151] bg-[#FDEDED]"
                            : order.status === "Delivered"
                              ? "text-[#2A9D8F] bg-[#E6F4F1]"
                              : "text-[#6B7280] bg-[#F3F4F6]"
                        }`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-4 text-gray-500"
                  >
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-full text-sm font-medium ${
                currentPage === i + 1
                  ? "bg-black text-white"
                  : "bg-white border text-gray-700 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
