//nice
"use client";

import { Clock3, Soup } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Order = {
  id: string;
  status: "Pending" | "Delivered";
  total: number;
  items: { name: string; quantity: number }[];
  date: string;
  address: string;
};

export const OrderPackage = () => {
  // Dummy data – энд API эсвэл props-р өгч болно
  const orders: Order[] = [
    {
      id: "#20156",
      status: "Pending",
      total: 26.97,
      date: "2024/12/20",
      address:
        "СБД, 12-р хороо, СБД нэгдсэн эмнэлэг | 100 айлын гүүрэн гарцны хойд талд",
      items: [
        { name: "Sunshine stackers", quantity: 1 },
        { name: "Sunshine stackers", quantity: 1 },
      ],
    },
    {
      id: "#20157",
      status: "Delivered",
      total: 26.97,
      date: "2024/12/20",
      address:
        "СБД, 12-р хороо, СБД нэгдсэн эмнэлэг | 100 айлын гүүрэн гарцны хойд талд",
      items: [{ name: "Sunshine stackers", quantity: 1 }],
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {orders.length === 0 ? (
        <div className="bg-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4">
          <img src="/logo.png" alt="Empty" className="w-16 h-16" />
          <h2 className="text-lg font-semibold text-black">No Orders Yet?</h2>
          <p className="text-gray-500 text-sm">
            🍕 "You haven't placed any orders yet. Start exploring our menu and
            satisfy your cravings!"
          </p>
        </div>
      ) : (
        <div className="w-full bg-white p-6 rounded-[20px] flex flex-col gap-6">
          <p className="text-[20px] font-semibold">Order history</p>

          {orders.map((order) => (
            <div key={order.id} className="space-y-3">
              <div className="flex justify-between">
                <p className="font-bold text-[16px]">
                  ${order.total.toFixed(2)} <span>({order.id})</span>
                </p>
                <Badge
                  className={`rounded-full ${
                    order.status === "Pending"
                      ? "text-black border-[#EF4444] bg-transparent"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {order.status}
                </Badge>
              </div>

              <div className="text-[12px] text-[#71717A] flex flex-col gap-1">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <div className="flex gap-2 items-center">
                      <Soup className="w-4 h-4" />
                      <p>{item.name}</p>
                    </div>
                    <p>x {item.quantity}</p>
                  </div>
                ))}
                <div className="flex gap-2 items-center">
                  <Clock3 className="w-4 h-4" />
                  <p>{order.date}</p>
                </div>
                <p>{order.address}</p>
                <div className="border border-dashed border-[#E4E4E7]" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPackage;
