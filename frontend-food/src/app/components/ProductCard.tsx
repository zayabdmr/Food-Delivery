"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";
import { Plus } from "lucide-react";

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <button
                onClick={() => handleOnclick(product._id)}
                className="absolute bottom-[12px] right-[12px] w-[44px] h-[44px] flex items-center justify-center bg-white rounded-full shadow-md"
              >
                <Plus className="text-[#EF4444]" />
              </button>
            </div>

            <div className="font-semibold flex items-center justify-between pt-[20px] pb-[8px]">
              <h3 className="text-[#EF4444] text-[20px]">{product.foodName}</h3>
              <p className="text-[#09090B] text-[18px] font-medium">
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
  );
};
