// export const Header = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [quantity, setQuantity] = useState(1);

//   const router = useRouter();

//   const handleIncrement = () => setQuantity((prev) => prev + 1);
//   const handleDecrement = () =>
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   useEffect(() => {
//     const fetchFood = async () => {
//       try {
//         const response = await axiosInstance.get("/food");
//         setProducts(response.data.food || []);
//       } catch (error) {
//         console.error("Error fetching food:", error);
//       }
//     };

//     fetchFood();
//   }, []);

//   return (
//     <div className="w-full h-full bg-[#18181B] px-[88px] py-[12px] flex items-center justify-between">
//       <img src="nlogo.png" className="w-[146px] h-[44px]" />

//       <div className="flex items-center gap-3">
//         <input
//           className="w-[251px] h-[36px] bg-[#FFF] rounded-full px-4"
//           placeholder="Search food"
//         />

//         <Sheet>
//           <SheetTrigger asChild>
//             <Button variant="outline" className="rounded-full bg-[#F4F4F5] p-2">
//               <ShoppingCart size={18} color="black" />
//             </Button>
//           </SheetTrigger>

//           <SheetContent
//             side="right"
//             className="bg-[#404040] w-[550px] p-0 overflow-y-auto"
//           >
//             <SheetHeader className="p-6">
//               <SheetTitle className="flex gap-3 items-center">
//                 <ShoppingCart size={24} color="white" />
//                 <h4 className="text-white text-[20px] font-semibold">
//                   Order detail
//                 </h4>
//               </SheetTitle>

//               <div className="mt-6 px-4">
//                 <div className="flex gap-2 text-[18px]">
//                   <button className=" bg-[#EF4444] h-[40px] w-[230px] text-[#FAFAFA] rounded-full flex items-center justify-center transition-all duration-200 hover:bg-[#18181B] hover:text-[#FAFAFA]">
//                     Cart
//                   </button>

//                   <button className="bg-[#FFF] h-[40px] w-[230px] text-[#09090B] rounded-full flex items-center justify-center transition-all duration-200 hover:bg-[#18181B] hover:text-[#FAFAFA]">
//                     Order
//                   </button>
//                 </div>

//                 <div className="bg-white rounded-[20px] mt-6 p-6">
//                   <h4 className="text-black text-[20px] font-semibold mb-4">
//                     My cart
//                   </h4>

//                   <div className="w-[471px] h-[540px] flex flex-col gap-4">
//                     {products.slice(0, 2).map((product) => (
//                       <div
//                         key={product._id}
//                         className="flex items-center gap-4 border-b pb-4"
//                       >
//                         <img
//                           src={product.image}
//                           className="w-[60px] h-[60px] rounded-md object-cover"
//                         />

//                         <div className="flex-1">
//                           <h3 className="text-[#EF4444] text-[16px] font-semibold">
//                             {product.foodName}
//                           </h3>
//                           <p className="text-[#71717A] text-[12px] line-clamp-2">
//                             {product.ingredients}
//                           </p>

//                           <div className="flex items-center gap-2 mt-2">
//                             <Button
//                               variant="outline"
//                               size="icon"
//                               className="w-6 h-6 p-0"
//                               onClick={handleDecrement}
//                             >
//                               <Minus size={12} />
//                             </Button>
//                             <span className="text-[14px]">{quantity}</span>
//                             <Button
//                               variant="outline"
//                               size="icon"
//                               className="w-6 h-6 p-0"
//                               onClick={handleIncrement}
//                             >
//                               <Plus size={12} />
//                             </Button>
//                           </div>
//                         </div>

//                         <div className="flex flex-col items-end gap-2">
//                           <p className="text-black font-medium text-[14px]">
//                             ${product.price}
//                           </p>
//                           <Button
//                             variant="outline"
//                             size="icon"
//                             className="w-6 h-6 p-0"
//                           >
//                             <X size={14} />
//                           </Button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <Button className="w-full h-[42px] rounded-full bg-white border mt-6 text-black">
//                     Add food
//                   </Button>
//                 </div>

//                 <div className="bg-white rounded-[20px] mt-6 p-4">
//                   <h4 className="text-black text-[20px] font-semibold mb-4">
//                     Payment info
//                   </h4>

//                   <div className="flex justify-between text-[16px]">
//                     <p className="text-[#71717A]">Items</p>
//                     <p className="text-black font-bold">{} price</p>
//                   </div>
//                   <div className="flex justify-between text-[16px] mt-2">
//                     <p className="text-[#71717A] font-bold">Shipping</p>
//                     <p>{}-.99</p>
//                   </div>
//                   <div className="border-t my-3"></div>
//                   <div className="flex justify-between text-[16px]">
//                     <p className="text-[#71717A] font-bold">Total</p>
//                     <p>{} niit</p>
//                   </div>
//                 </div>

//                 <Button className="w-full h-[44px] rounded-full mt-4 bg-[#EF4444] text-white">
//                   Checkout
//                 </Button>
//               </div>
//             </SheetHeader>
//           </SheetContent>
//         </Sheet>

//         <Button className="rounded-full bg-[#EF4444] p-2">
//           <User size={18} color="white" />
//         </Button>
//       </div>
//     </div>
//   );
// };

"use client";
import {
  ChevronRight,
  MapPin,
  ShoppingCart,
  User,
  X,
  Minus,
  Plus,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CardPackage } from "./CardPackage";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
interface DecodedToken {
  _id: string;
  address: string;
}
import { axiosInstance } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type FoodType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  deliveryMockAddress: string;
  isAdminPage: boolean;
  foodPackageId: string;
  category: {
    _id: string;
    categoryName: string;
  };
  quantity: number;
};

export const Header = ({ deliveryInputRef }: { deliveryInputRef: any }) => {
  const router = useRouter();
  const handleToLogin = () => {
    router.push("/login");
  };
  const [userId, setUserId] = useState<string | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState<string | null>(null);
  const [myCartfoods, setMyCartFoods] = useState<FoodType[]>([]);

  const fetchAddress = () => {
    const token = localStorage.getItem("token");
    try {
      const requestAddress = {
        address: deliveryInputRef.current?.value,
      };

      axiosInstance.put(`/user`, requestAddress, {
        headers: {
          authorization: token,
        },
      });
    } catch (error) {
      console.error("no token", error);
    }
  };

  const fetchFoods = () => {
    const storedFoods = window.localStorage.getItem("foods");
    const card = storedFoods ? JSON.parse(storedFoods) : [];
    setMyCartFoods(card);
    console.log("myCartfoods", myCartfoods);
  };

  const [isSelected, setIsSelected] = useState(0);

  const handleIsSelected = (id: number) => {
    setIsSelected(id);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token);
      setUserId(decodedToken._id);
      setDeliveryAddress(decodedToken.address);
    }
    fetchFoods();
  }, [myCartfoods.length]);

  const duplicatedPage = [<CardPackage />, <CardPackage />][isSelected];
  return (
    <div className="bg-[#18181B] h-[68px] w-full flex items-center justify-between px-[88px] py-3 fixed z-9999 ">
      <div className="flex gap-3 items-center">
        <img src="nlogo.png" className="w-[146px] h-[44px]" />
      </div>
      <div className="flex items-center gap-[13px]">
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="flex items-center gap-3 bg-white rounded-full px-3 py-2">
              <MapPin className="text-[#EF4444]" />
              {deliveryAddress ? (
                <p className="text-[#EF4444]">{deliveryAddress}</p>
              ) : (
                <p className="text-[#EF4444]">
                  Delivery address:{" "}
                  <span className="text-[#71717A]">Add location</span>
                </p>
              )}

              <ChevronRight className="text-[#71717A]" />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader className="flex flex-col gap-[24px]">
              <AlertDialogDescription></AlertDialogDescription>
              <div className="flex justify-between items-center">
                {" "}
                <AlertDialogTitle>Delivery Address</AlertDialogTitle>
                <AlertDialogCancel className="rounded-full h-[36px] w-[36px] border-none bg-gray-200">
                  <X />
                </AlertDialogCancel>
              </div>
              <Textarea
                onChange={(e) => setDeliveryAddress(e.target.value)}
                ref={deliveryInputRef}
                className="h-[112px]"
                placeholder="Please provide specific address details such as building number, entrance, and apartment number"
              />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-[#18181B]"
                onClick={fetchAddress}
              >
                Deliver Here
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              tabIndex={0}
              className="bg-white rounded-full w-[36px] h-[36px] flex items-center justify-center"
            >
              {myCartfoods.length > 0 ? (
                <p className="text-red-700 text-bold">{myCartfoods.length}</p>
              ) : (
                <ShoppingCart className="text-[#18181B]" />
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            style={{ maxWidth: "535px" }}
            className="!w-[645px] pt-20 bg-[#404040] flex flex-col gap-6 overflow-y-scroll"
          >
            <SheetHeader className="flex flex-col gap-6">
              <SheetTitle className="flex gap-2">
                <ShoppingCart className="text-white" />
                <p className="text-white">Order details</p>
              </SheetTitle>
              <SheetDescription className="flex w-full justify-between bg-white p-1 rounded-full">
                <Button
                  onClick={() => handleIsSelected(0)}
                  className={`px-17 rounded-full w-[227px]  ${
                    isSelected == 0
                      ? "bg-[#EF4444] text-white"
                      : "bg-white text-black"
                  } `}
                >
                  <div>Cart</div>
                </Button>
                <Button
                  onClick={() => handleIsSelected(1)}
                  className={`px-17 rounded-full w-[227px]  ${
                    isSelected == 1
                      ? "bg-[#EF4444] text-white"
                      : "bg-white text-black"
                  } `}
                >
                  <div>Order</div>
                </Button>
              </SheetDescription>
              {duplicatedPage}
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Avatar className="w-[36px] h-[36px]" onClick={handleToLogin}>
          <AvatarImage src="" alt="@avatar" />
          <AvatarFallback className="bg-[#EF4444]">
            <User className="text-white" />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
