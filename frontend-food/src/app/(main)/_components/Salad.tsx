import axios from "axios";
import { useEffect, useState } from "react";
import { FoodPackage } from "./FoodPackage";

type FoodType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  deliveryMockAddress: string;
  isAdminPage: boolean;
  _id: string;
  category: {
    _id: string;
    categoryName: string;
  };
};
export const SaladContainer = ({
  deliveryMockAddress,
}: {
  deliveryMockAddress: string;
}) => {
  const [saladData, setSaladData] = useState<FoodType[]>([]);

  const fetchSaladData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/food/6800b561d95efcaef95fc883`
      );
      setSaladData(response.data.foods);
    } catch (error) {
      console.error("cannot fetch data", error);
    }
  };

  const slicedData = saladData.slice(0, 3);

  useEffect(() => {
    fetchSaladData();
  }, []);

  return (
    <div className="flex flex-col gap-[54px]">
      <p className="text-[30px] text-white font-semibold">Salads</p>
      <div className="flex gap-9 flex-wrap">
        {slicedData.map((value, index) => (
          <FoodPackage
            value={value}
            foodPackageId={value._id}
            deliveryMockAddress={deliveryMockAddress}
            key={index}
            foodName={value.foodName}
            price={value.price}
            image={value.image}
            ingredients={value.ingredients}
            isAdminPage={false}
            category={{
              _id: value.category?._id || "",
              categoryName: value.category?.categoryName || "Unknown",
            }}
          />
        ))}
      </div>
    </div>
  );
};
