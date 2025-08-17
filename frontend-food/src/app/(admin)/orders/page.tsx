"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";
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
import { Avatar } from "../orders/component/Avatar";
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
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/foodOrder");
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOrders();
  }, []);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <div className="bg-[#F4F4F5] min-h-screen w-[1300px] py-6">
      <div className="max-w-[1200px] mx-auto space-y-6">
        <div className="flex justify-end">
          <Avatar />
        </div>

        <div className="flex items-center justify-between bg-white rounded-[8px] px-6 py-4">
          <div>
            <h1 className="text-[#09090B] text-[20px] font-bold">Orders</h1>
            <p className="text-[12px] text-[#71717A] font-medium">
              {orders.length} items
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Input
              type="date"
              className="w-[300px] h-[36px] rounded-full border-[#E4E4E7]"
            />
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
                <TableHead>Delivery State</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order, index) => (
                  <TableRow key={order._id} className="text-sm">
                    <TableCell>
                      <input type="checkbox" />
                    </TableCell>
                    <TableCell>{indexOfFirst + index + 1}</TableCell>
                    <TableCell>{order.user?.email || "Unknown"}</TableCell>

                    <TableCell>
                      <HoverCard>
                        <HoverCardTrigger className="underline cursor-pointer text-blue-600">
                          {order.foodOrderItems.length} foods
                        </HoverCardTrigger>
                        <HoverCardContent className="bg-white border p-3 rounded-lg shadow-md w-65 space-y-2">
                          {order.foodOrderItems.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-center space-x-2"
                            >
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
                      <span className="px-3 py-1 rounded-full text-[12px] font-medium">
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
