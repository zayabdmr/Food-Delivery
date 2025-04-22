"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";

type Product = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
};

export const ProductCard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  const handleOnclick = (id: string) => {
    router.push(`/searchFilter?product=${id}`);
  };

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axiosInstance.get("/food");
        setProducts(response.data.food);
      } catch (error) {
        console.error("Error fetching food:", error);
      }
    };

    fetchFood();
  }, []);

  return (
    <div className="px-[88px] bg-[#404040]">
      <h2 className="text-[#FFF] text-[30px] font-semibold">Appetizers</h2>

      <div className="flex gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-[#FFF] w-[398px] h-[342px] p-[16px] rounded-[20px] relative overflow-hidden"
          >
            <div className="relative">
              <img
                className="w-[365px] h-[210px] rounded-[12px] object-cover"
                src={product.image}
                alt={product.foodName}
              />

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[40px] !h-[40px] bg-[#EF4444] flex justify-center items-center rounded-full !static   
                      bottom-[12px] right-[12px] shadow-md"
                  >
                    <Plus className="text-[#EF4444]" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="md:max-w-[826px] md: max-h-[512px]">
                  <div className="flex gap-4 py-4">
                    <img
                      src={product.image}
                      className="w-[377px] h-[364px] rounded-xl"
                    />
                    <div className="flex flex-col ">
                      <h2 className="text-[30px] font-semibold text-[#EF4444]">
                        {product.foodName}
                      </h2>
                      <p className="text-[#09090B] text-[16px]">
                        {product.ingredients}
                      </p>
                      <p>Total price</p>
                      <h3 className="text-[#09090B] text-[24px] font-semibold">
                        ₮{product.price}
                      </h3>

                      <div className="flex">
                        <button>
                          <Minus />
                        </button>

                        <button>
                          <Plus />
                        </button>
                      </div>

                      <Button
                        type="submit"
                        className="w-[377px] h-[44px] rounded-full"
                      >
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="font-semibold flex items-center justify-between pt-[20px] pb-[8px]">
              <h3 className="text-[#EF4444] text-[20px]">{product.foodName}</h3>
              <p className="text-[#09090B] text-[18px] font-medium">
                ₮{product.price}
              </p>
            </div>
            <p className="text-[#09090B] text-[14px] font-normal leading-snug line-clamp-2">
              {product.ingredients}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
