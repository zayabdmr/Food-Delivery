"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Soup, Timer, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import MyCart from "./MyCart";

type Order = {
  id: number;
  status: "Pending" | "Delivered";
  total: number;
  date: string;
  address: string;
  items: { name: string; quantity: number }[];
};

export default function CartSheet() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"cart" | "orders">("cart");
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [itemsTotal, setItemsTotal] = useState(0);

  const SHIPPING_FEE = 0.99;
  const total = itemsTotal + SHIPPING_FEE;

  const orders: Order[] = [
    {
      id: 20156,
      status: "Pending",
      total: 26.97,
      date: "2024/12/20",
      address: "СБД, 1-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen em...",
      items: [
        { name: "Sunshine Stackers", quantity: 1 },
        { name: "Sunshine Stackers", quantity: 1 },
      ],
    },
    {
      id: 20157,
      status: "Delivered",
      total: 12.99,
      date: "2024/12/20",
      address: "СБД, 1-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen em...",
      items: [{ name: "Sunshine Stackers", quantity: 1 }],
    },
  ];

  const handleCheckout = () => setIsLoginDialogOpen(true);
  const handleLogin = () => {
    setIsLoginDialogOpen(false);
    router.push("/log-in");
  };
  const handleSignup = () => {
    setIsLoginDialogOpen(false);
    router.push("/sign-up");
  };

  return (
    <Sheet>
      {/* Cart Icon Trigger */}
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open cart"
          className="rounded-full bg-white w-9 h-9 hover:bg-black/10"
        >
          <ShoppingCart color="black" className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      {/* Cart & Orders Drawer */}
      <SheetContent className="w-full sm:max-w-lg bg-[#404040] text-white overflow-y-auto">
        <SheetHeader className="px-6">
          <SheetTitle className="flex items-center gap-2 text-xl font-semibold text-white">
            <ShoppingCart /> Order detail
          </SheetTitle>

          {/* Tabs */}
          <SheetDescription asChild>
            <div className="flex w-full gap-1 bg-white p-1 rounded-full">
              {["cart", "orders"].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "default" : "ghost"}
                  onClick={() => setActiveTab(tab as "cart" | "orders")}
                  className={`rounded-full flex-1 ${
                    activeTab === tab ? "bg-red-500 text-white" : "text-black"
                  }`}
                >
                  {tab === "cart" ? "Cart" : "Orders"}
                </Button>
              ))}
            </div>
          </SheetDescription>
        </SheetHeader>

        <div className="px-6 py-4 space-y-6">
          {/* CART TAB */}
          {activeTab === "cart" && (
            <>
              <MyCart items={FoodList} />

              {/* Payment Info */}
              <div className="bg-white text-[#71717A] p-4 rounded-2xl space-y-3">
                <h4 className="font-semibold">Payment info</h4>

                <div className="flex justify-between text-sm">
                  <span>Items</span>
                  <span className="text-black">${itemsTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-black">${SHIPPING_FEE.toFixed(2)}</span>
                </div>
                <div className="border-t border-dashed pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-black">${total.toFixed(2)}</span>
                </div>

                {/* Checkout Button + Login Dialog */}
                <Dialog
                  open={isLoginDialogOpen}
                  onOpenChange={setIsLoginDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold py-2"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-xs rounded-xl p-6">
                    <DialogHeader className="items-center space-y-2">
                      <DialogTitle className="text-lg text-center">
                        You need to log in first
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex gap-3 mt-4">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={handleLogin}
                      >
                        Log in
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={handleSignup}
                      >
                        Sign up
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </>
          )}

          {/* ORDERS TAB */}
          {activeTab === "orders" && (
            <div className="bg-white p-6 rounded-2xl shadow-sm text-gray-800">
              <h1 className="font-semibold text-[20px] mb-4">Order history</h1>

              {orders.map((order) => (
                <div
                  key={order.id}
                  className="pb-4 mb-4 border-b border-dashed last:border-none"
                >
                  {/* Order Header */}
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-black font-bold">
                      ${order.total.toFixed(2)} <span>(#{order.id})</span>
                    </div>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        order.status === "Pending"
                          ? "text-black border border-red-600 bg-red-200"
                          : "text-black bg-gray-200"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-sm mb-1 text-gray-500"
                    >
                      <div className="flex items-center gap-2">
                        <Soup size={18} />
                        <span>{item.name}</span>
                      </div>
                      <span>x {item.quantity}</span>
                    </div>
                  ))}

                  {/* Date & Address */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <Timer size={18} />
                    <span>{order.date}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-500 mt-1">
                    <Map size={18} />
                    <span className="line-clamp-1">{order.address}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
