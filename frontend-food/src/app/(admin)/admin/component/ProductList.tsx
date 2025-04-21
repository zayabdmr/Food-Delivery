"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";
import { Pen, Plus } from "lucide-react";

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
    <div className="w-screen h-screen">
      <div className="space-y-6 px-[40px] py-[24px]">
        <div className="w-[1171px] h-[582px] bg-[#FFF] rounded-xl p-6">
          <h4 className="text-[#09090B] text-[20px] font-semibold">
            Appetizers
          </h4>

          <div className="flex">
            <div className="flex w-[270px] h-[225px] flex-col justify-center items-center gap-6 border border-[#EF4444] rounded-[20px] ">
              <button className="w-[40px] h-[40px] bg-[#EF4444] flex justify-center items-center rounded-full">
                <Plus size={16} color="white" />
              </button>

              <p className="text-[14px] font-medium w-[154px] h-[40px] flex justify-center px-[20px] items-center">
                Add new Dish to Appetizers
              </p>
            </div>
            <div className="flex gap-4 p-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-[#FFF] w-[270px] h-[241px] p-[16px] rounded-[20px] relative overflow-hidden border border-[#E4E4E7]"
                >
                  <div className="relative">
                    <img
                      className="w-[238px] h-[129px] rounded-[12px] object-cover"
                      src={product.image}
                      alt={product.foodName}
                    />
                    <button
                      onClick={() => handleOnclick(product._id)}
                      className="absolute bottom-[12px] right-[12px] w-[44px] h-[44px] flex items-center justify-center bg-white rounded-full shadow-md"
                    >
                      <Pen size={16} className="text-[#EF4444]" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-[20px] pb-[8px]">
                    <h3 className="text-[#EF4444] text-[14px] font-medium">
                      {product.foodName}
                    </h3>
                    <p className="text-[#09090B] text-[12px]">
                      ${product.price}
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
      </div>
    </div>
  );
};
