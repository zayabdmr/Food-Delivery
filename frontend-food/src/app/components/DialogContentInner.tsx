import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";








export DialogContentInner = ({ food }: { food: food }) => {
    const [quantity, setQuantity] = useState(1);
  
    const handleIncrement = () => setQuantity((prev) => prev + 1);
    const handleDecrement = () =>
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));


  return (
  <div>
     <div className="flex gap-7">
      <img
        src={food.image}
        className="w-[377px] h-[364px] rounded-xl object-cover"
        alt={food.foodName}
      />
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-[30px] font-semibold text-[#EF4444]">
            {food.foodName}
          </h2>
          <p className="text-[#09090B] text-[16px] mb-35">{food.ingredients}</p>
          <div className="flex justify-between">
            <div>
              <p className="text-[#09090B] text-sm">Total price</p>
              <h3 className="text-[24px] font-semibold text-[#09090B] mb-4">
                ₮{food.price * quantity}
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleDecrement}
                className="w-[44px] h-[44px] rounded-full"
              >
                <Minus size={16} />
              </Button>
              <span className="text-[18px] font-semibold">{quantity}</span>
              <Button
                variant="outline"
                onClick={handleIncrement}
                className="w-[44px] h-[44px] rounded-full"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
        </div>
        <Button className="w-[377px] h-[44px] rounded-full flex justify-center items-center font-medium text-white bg-black">
          Add to cart
        </Button>
      </div>
    </div>
  </div>
  );
};
