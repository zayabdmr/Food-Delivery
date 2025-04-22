"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";
import { Pen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
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

type Product = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
};

export const ProductList = () => {
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
    <div className="w-screen">
      <div className="space-y-6  py-[24px]">
        <div className="w-[1171px] bg-[#FFF] rounded-xl p-6">
          <h4 className="text-[#09090B] text-[20px] font-semibold mb-4">
            Appetizers ({products.length})
          </h4>

          <div className="flex flex-wrap gap-4">
            <div className="w-[270px] h-[241px] flex flex-col justify-center items-center gap-4 border-2 border-dashed border-[#EF4444] rounded-[20px]">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[40px] !h-[40px] bg-[#EF4444] flex justify-center items-center rounded-full !static"
                  >
                    <Plus size={16} color="white" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add new Dish to Appetizers</DialogTitle>
                  </DialogHeader>
                  <div className="flex gap-4 py-4">
                    <div className="flex flex-col gap-4 ">
                      <Label htmlFor="name" className="text-right">
                        Food name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Type food name"
                        className="col-span-3"
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="username" className="text-right">
                        Food price
                      </Label>
                      <Input
                        id="username"
                        placeholder="Enter price..."
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="username" className="text-right">
                      Ingredients
                    </Label>
                    <Input
                      id="username"
                      placeholder="List ingredients..."
                      className="w-[380px] h-[138px]"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="username" className="text-right">
                      Food image
                    </Label>
                    <Input
                      type="img"
                      id="username"
                      placeholder="List ingredients..."
                      className="w-[380px] h-[138px]"
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Dish</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <p className="text-[14px] font-medium text-center w-[154px]">
                Add new Dish to <br /> Appetizers
              </p>
            </div>

            {products.map((product) => (
              <div
                key={product._id}
                className="bg-[#FFF] w-[270px] h-[241px] p-[16px] rounded-[20px] relative border border-[#E4E4E7]"
              >
                <div className="relative">
                  <img
                    className="w-[238px] h-[129px] rounded-[12px] object-cover"
                    src={product.image}
                    alt={product.foodName}
                  />

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="absolute bottom-[12px] right-[12px] w-[44px] h-[44px] flex items-center justify-center bg-white rounded-full shadow-md"
                      >
                        <Pen size={16} className="text-[#EF4444]" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add new Dish to Appetizers</DialogTitle>
                      </DialogHeader>
                      <div className="flex gap-4 py-4">
                        <div className="flex flex-col gap-4 ">
                          <Label htmlFor="name" className="text-right">
                            Food name
                          </Label>
                          <Input
                            id="name"
                            placeholder="Type food name"
                            className="col-span-3"
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <Label htmlFor="username" className="text-right">
                            Food price
                          </Label>
                          <Input
                            id="username"
                            placeholder="Enter price..."
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <Label htmlFor="username" className="text-right">
                          Ingredients
                        </Label>
                        <Input
                          id="username"
                          placeholder="List ingredients..."
                          className="w-[380px] h-[138px]"
                        />
                      </div>
                      <div className="flex flex-col gap-4">
                        <Label htmlFor="username" className="text-right">
                          Food image
                        </Label>
                        <Input
                          type="img"
                          id="username"
                          placeholder="List ingredients..."
                          className="w-[380px] h-[138px]"
                        />
                      </div>
                      <DialogFooter>
                        <Button type="submit">Add Dish</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center justify-between pt-[20px] pb-[8px]">
                  <h3 className="text-[#EF4444] text-[14px] font-medium line-clamp-1">
                    {product.foodName}
                  </h3>
                  <p className="text-[#09090B] text-[12px]">₮{product.price}</p>
                </div>

                <p className="text-[#09090B] text-[14px] font-normal leading-snug line-clamp-2">
                  {product.ingredients}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
