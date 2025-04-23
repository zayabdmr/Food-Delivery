import { Minus, Plus, ShoppingCart, User } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
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

  const handleClick = (id: string) => {
    router.push(`/searchFilter?product=${id}`);
  };

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
        <input className="w-[251px] h-[36px] bg-[#FFF] rounded-full " />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="rounded-full bg-[#F4F4F5] p-2">
              <ShoppingCart size={18} color="black" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-[#404040]">
            <SheetHeader>
              <SheetTitle className="flex gap-3">
                <ShoppingCart size={24} color="white" />
                <h4 className="text-[#FAFAFA] text-[20px] font-semibold">
                  Order detail
                </h4>
              </SheetTitle>
              <div className="p-8">
                <div className="bg-[#FFF] flex justify-around items-center rounded-full">
                  <button className="bg-[#EF4444] w-[150px] h-[32px] rounded-full ">
                    <p className="text-[#FAFAFA] text-[18px]">Cart</p>
                  </button>

                  <button className="bg-[#FFF] w-[150px] h-[36px] roinded-full">
                    <p className="text-[#09090B] text-[18px]">Order</p>
                  </button>
                </div>

                <div className="bg-[#FFF] w-[471px] h-[540px]">
                  <h4 className="text-[#09090B] text-[20px] font-semibold">
                    My cart
                  </h4>

                  <div className="flex gap-6 flex-wrap py-6">
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
                              <Button className="absolute w-[40px] !h-[40px] bg-[#EF4444] flex justify-center items-center rounded-full bottom-[12px] right-[12px] shadow-md">
                                <Plus className="text-white" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="md:max-w-[826px] md:max-h-[512px]">
                              <DialogTitle></DialogTitle>
                              <div className="flex gap-4 py-4">
                                <img
                                  src={product.image}
                                  className="w-[377px] h-[364px] rounded-xl object-cover"
                                  alt={product.foodName}
                                />
                                <div className="flex flex-col justify-between">
                                  <div>
                                    <h2 className="text-[30px] font-semibold text-[#EF4444]">
                                      {product.foodName}
                                    </h2>
                                    <p className="text-[#09090B] text-[16px] mb-4">
                                      {product.ingredients}
                                    </p>
                                    <p className="text-[#09090B] text-sm">
                                      Total price
                                    </p>
                                    <h3 className="text-[24px] font-semibold text-[#09090B] mb-4">
                                      ₮{product.price * quantity}
                                    </h3>
                                    <div className="flex items-center gap-4 mb-4">
                                      <Button
                                        variant="outline"
                                        onClick={handleDecrement}
                                        className="w-8 h-8 rounded-full"
                                      >
                                        <Minus size={16} />
                                      </Button>
                                      <span className="text-lg">
                                        {quantity}
                                      </span>
                                      <Button
                                        variant="outline"
                                        onClick={handleIncrement}
                                        className="w-8 h-8 rounded-full"
                                      >
                                        <Plus size={16} />
                                      </Button>
                                    </div>
                                  </div>
                                  <Button className="w-[377px] h-[44px] rounded-full flex justify-between items-center px-6 text-white bg-black">
                                    Add to cart
                                    <span className="bg-[#EF4444] rounded-full px-4 py-[2px] text-white ml-2">
                                      {quantity}
                                    </span>
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>

                        <div className="font-semibold flex items-center justify-between pt-[20px] pb-[8px]">
                          <h3 className="text-[#EF4444] text-[20px]">
                            {product.foodName}
                          </h3>
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
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <button className="rounded-full bg-[#EF4444] p-2">
          <User size={18} color="white" />
        </button>
      </div>
    </div>
  );
};
