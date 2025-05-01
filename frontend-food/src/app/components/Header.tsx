"use client";
import { Minus, Plus, ShoppingCart, User, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";

type Product = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  categoryName: string;
};

export const Header = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axiosInstance.get("/food");
        setProducts(response.data.food || []);
      } catch (error) {
        console.error("Error fetching food:", error);
      }
    };

    fetchFood();
  }, []);

  return (
    <div className="w-full h-full bg-[#18181B] px-[88px] py-[12px] flex items-center justify-between">
      <img src="nlogo.png" className="w-[146px] h-[44px]" />

      <div className="flex items-center gap-3">
        <input
          className="w-[251px] h-[36px] bg-[#FFF] rounded-full px-4"
          placeholder="Search food"
        />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="rounded-full bg-[#F4F4F5] p-2">
              <ShoppingCart size={18} color="black" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="bg-[#404040] w-[550px] p-0 overflow-y-auto"
          >
            <SheetHeader className="p-6">
              <SheetTitle className="flex gap-3 items-center">
                <ShoppingCart size={24} color="white" />
                <h4 className="text-white text-[20px] font-semibold">
                  Order detail
                </h4>
              </SheetTitle>

              <div className="mt-6 px-4">
                <div className="flex gap-2 text-[18px]">
                  <button className=" bg-[#EF4444] h-[40px] w-[230px] text-[#FAFAFA] rounded-full flex items-center justify-center transition-all duration-200 hover:bg-[#18181B] hover:text-[#FAFAFA]">
                    Cart
                  </button>

                  <button className="bg-[#FFF] h-[40px] w-[230px] text-[#09090B] rounded-full flex items-center justify-center transition-all duration-200 hover:bg-[#18181B] hover:text-[#FAFAFA]">
                    Order
                  </button>
                </div>

                <div className="bg-white rounded-[20px] mt-6 p-6">
                  <h4 className="text-black text-[20px] font-semibold mb-4">
                    My cart
                  </h4>

                  <div className="w-[471px] h-[540px] flex flex-col gap-4">
                    {products.slice(0, 2).map((product) => (
                      <div
                        key={product._id}
                        className="flex items-center gap-4 border-b pb-4"
                      >
                        <img
                          src={product.image}
                          className="w-[60px] h-[60px] rounded-md object-cover"
                        />

                        <div className="flex-1">
                          <h3 className="text-[#EF4444] text-[16px] font-semibold">
                            {product.foodName}
                          </h3>
                          <p className="text-[#71717A] text-[12px] line-clamp-2">
                            {product.ingredients}
                          </p>

                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-6 h-6 p-0"
                              onClick={handleDecrement}
                            >
                              <Minus size={12} />
                            </Button>
                            <span className="text-[14px]">{quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-6 h-6 p-0"
                              onClick={handleIncrement}
                            >
                              <Plus size={12} />
                            </Button>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <p className="text-black font-medium text-[14px]">
                            ${product.price}
                          </p>
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-6 h-6 p-0"
                          >
                            <X size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full h-[42px] rounded-full bg-white border mt-6 text-black">
                    Add food
                  </Button>
                </div>

                <div className="bg-white rounded-[20px] mt-6 p-4">
                  <h4 className="text-black text-[20px] font-semibold mb-4">
                    Payment info
                  </h4>

                  <div className="flex justify-between text-[16px]">
                    <p className="text-[#71717A]">Items</p>
                    <p className="text-black font-bold">{} price</p>
                  </div>
                  <div className="flex justify-between text-[16px] mt-2">
                    <p className="text-[#71717A] font-bold">Shipping</p>
                    <p>{}-.99</p>
                  </div>
                  <div className="border-t my-3"></div>
                  <div className="flex justify-between text-[16px]">
                    <p className="text-[#71717A] font-bold">Total</p>
                    <p>{} niit</p>
                  </div>
                </div>

                <Button className="w-full h-[44px] rounded-full mt-4 bg-[#EF4444] text-white">
                  Checkout
                </Button>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Button className="rounded-full bg-[#EF4444] p-2">
          <User size={18} color="white" />
        </Button>
      </div>
    </div>
  );
};
