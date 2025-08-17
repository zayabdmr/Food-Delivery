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
import { AxiosError } from "axios";

interface DecodedToken {
  userId?: string;
  _id?: string;
  exp?: number;
}

export default function MyCart({ items }: { items: Food[] }) {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<Food[]>(items);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      if (!decoded.exp || decoded.exp >= Date.now() / 1000) {
        setUserId(decoded._id || decoded.userId || null);
      }
    } catch {}
  }, []);

  useEffect(() => {
    setTotalPrice(cartItems.reduce((s, i) => s + i.price * i.quantity, 0));
  }, [cartItems]);

  useEffect(() => {
    if (cartItems.length) {
      localStorage.setItem("foods", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("foods");
    }
  }, [cartItems]);

  const updateQuantity = (name: string, d: number) =>
    setCartItems((p) =>
      p.map((i) =>
        i.foodName === name
          ? { ...i, quantity: Math.max(1, i.quantity + d) }
          : i
      )
    );

  const removeItem = (name: string) =>
    setCartItems((p) => p.filter((i) => i.foodName !== name));

  const handleCheckout = async () => {
    if (!userId) {
      setShowLoginAlert(true); // ✅ no-unused-expressions алдааг зассан
      return;
    }
    if (!cartItems.length) return alert("Your cart is empty");
    if (totalPrice <= 0) return alert("Invalid total price");
    if (!deliveryAddress.trim()) return alert("Please enter delivery address");

    setIsCheckingOut(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      await axiosInstance.post(
        `/foodOrder`,
        {
          userId,
          foodOrderItems: cartItems.map((i) => ({
            food: i._id,
            quantity: i.quantity,
          })),
          totalPrice: +(totalPrice + 0.99).toFixed(2),
          deliveryMockAddress: deliveryAddress.trim(),
        },
        { headers: { Authorization: `Bearer ${token}` }, timeout: 15000 }
      );

      localStorage.removeItem("foods");
      setCartItems([]);
      setDeliveryAddress("");
      setShowSuccessAlert(true);
    } catch (err: unknown) {
      const error = err as AxiosError;

      const status = error.response?.status;
      const data = error.response?.data;

      const msg =
        data &&
        typeof data === "object" &&
        "message" in data &&
        typeof (data as Record<string, unknown>).message === "string"
          ? (data as { message: string }).message
          : undefined;

      if (status === 401 || status === 403) {
        localStorage.removeItem("token");
        setUserId(null);
        setShowLoginAlert(true);
      } else {
        alert(`Checkout failed: ${msg || "Please try again"}`);
      }
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!cartItems.length && !showSuccessAlert)
    return (
      <div className="p-6 bg-white rounded-2xl">
        <h2 className="text-black font-semibold text-xl mb-4">My cart</h2>
        <div className="bg-gray-100 rounded-xl p-8 text-center space-y-3">
          <img src="/logo.png" alt="Empty" className="w-16 h-16 mx-auto" />
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

  return (
    <div className="flex flex-col gap-6 max-h-[90vh] overflow-y-auto pr-2">
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-[20px] font-semibold text-[#71717A] mb-6">
          My Cart
        </h2>
        <div className="space-y-6">
          {cartItems.map(
            ({ foodName, image, ingredients, quantity, price }) => (
              <div key={foodName} className="border-b pb-6 last:border-none">
                <div className="flex gap-4">
                  <img
                    src={image || "/placeholder.jpg"}
                    alt={foodName}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div className="flex flex-col justify-between flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-red-500 font-bold">{foodName}</h3>
                        <p className="text-black text-sm mt-1">{ingredients}</p>
                      </div>
                      <button
                        onClick={() => removeItem(foodName)}
                        className="border border-red-500 rounded-full p-2 hover:bg-red-50"
                      >
                        <X className="text-red-500 w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-2 border rounded-full px-3 py-1">
                        <button
                          onClick={() => updateQuantity(foodName, -1)}
                          disabled={quantity <= 1}
                          className="disabled:opacity-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="mx-2 min-w-[20px] text-center">
                          {quantity}
                        </span>
                        <button onClick={() => updateQuantity(foodName, 1)}>
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="font-semibold">
                        ₮{(price * quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

          <div className="flex flex-col gap-3 pt-4">
            <h4 className="font-semibold text-[20px] text-gray-500">
              Delivery location *
            </h4>
            <Textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Complete address"
              className="min-h-[100px]"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-[20px] flex flex-col gap-5">
        <p className="text-[20px] font-semibold">Payment info</p>
        <div className="flex justify-between">
          <p>Items</p>
          <p>₮{totalPrice.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping</p>
          <p>₮0.99</p>
        </div>
        <div className="border border-dashed" />
        <div className="flex justify-between font-semibold">
          <p>Total</p>
          <p>₮{(totalPrice + 0.99).toFixed(2)}</p>
        </div>
        <Button
          onClick={handleCheckout}
          disabled={isCheckingOut || !deliveryAddress.trim()}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full"
        >
          {isCheckingOut ? "Processing..." : "Checkout"}
        </Button>
      </div>

      {showLoginAlert && (
        <AlertDialog open={showLoginAlert} onOpenChange={setShowLoginAlert}>
          <AlertDialogContent>
            <AlertDialogHeader className="text-center">
              <AlertDialogTitle>You need to log in first</AlertDialogTitle>
              <AlertDialogDescription>
                Please log in or sign up to complete your order.
              </AlertDialogDescription>
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={() => router.push("/login")}
                  className="bg-white text-black hover:bg-black hover:text-white border-2 flex-1"
                >
                  Log in
                </Button>
                <Button
                  onClick={() => router.push("/sign-up")}
                  className="bg-white text-black hover:bg-black hover:text-white border-2 flex-1"
                >
                  Sign up
                </Button>
              </div>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {showSuccessAlert && (
        <AlertDialog open={showSuccessAlert} onOpenChange={setShowSuccessAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center">
                Your order has been successfully placed!
              </AlertDialogTitle>
              <AlertDialogDescription>
                <img
                  src="/boy.png"
                  alt="Success"
                  className="mx-auto w-[200px] h-[265px]"
                />
              </AlertDialogDescription>
              <div className="flex justify-center">
                <Button
                  onClick={() => {
                    setShowSuccessAlert(false);
                    setTimeout(() => router.push("/"), 300);
                  }}
                  className="bg-gray-200 text-black rounded-full hover:text-white pt-2 w-[200px]"
                >
                  Back to home
                </Button>
              </div>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
