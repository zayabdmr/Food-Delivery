import { ShoppingCart, User } from "lucide-react";

export const Header = () => {
  return (
    <div className="w-full h-full bg-[#18181B] px-[88px] py-[12px] flex items-center justify-between">
      <img src="nlogo.png" className="w-[146px] h-[44px]" />

      <div className="flex items-center gap-3">
        <input className="w-[251px] h-[36px] bg-[#FFF] rounded-full" />

        <button className="rounded-full bg-[#F4F4F5] p-2">
          <ShoppingCart size={18} color="black" />
        </button>

        <button className="rounded-full bg-[#EF4444] p-2">
          <User size={18} color="white" />
        </button>
      </div>
    </div>
  );
};

// export const Header = () => {
//   return (
//     <div className="w-screen h-[44px] bg-[#18181B] px-[88px] flex">
//       <img src="nlogo.png" className="w-[146px] h-[44px]" />
//       <button className="text-[#18181B] text-[14px] rounded-2xl bg-[#F4F4F5] py-[8px] px-[12px]">
//         Sign up
//       </button>
//       <button className="text-[#FAFAFA] text-[14px] rounded-2xl bg-[#EF4444] py-[8px] px-[12px]">
//         Log in
//       </button>
//     </div>
//   );
// };
