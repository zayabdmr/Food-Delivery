"use client";
import { useRouter } from "next/navigation";

export const Footer = () => {
  const router = useRouter();
  const home = () => router.push("/");

  return (
    <div className="w-full flex flex-col items-center bg-[#18181B] gap-12 md:gap-[76px] py-10 md:py-0">
      <div className="marquee-container h-[60px] md:h-[92px] bg-[#EF4444] mt-6 md:mt-[60px] flex items-center w-full">
        <div className="marquee-content">
          {[...Array(40)].map((_, idx) => (
            <span
              key={idx}
              className="marquee-item text-white text-base md:text-[20px] font-semibold mx-6 md:mx-12"
            >
              Fresh fast delivered
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full px-6 md:px-28 gap-10 md:gap-[400px] items-start">
        <div className="flex flex-col items-center md:items-start gap-3">
          <img src="logo.png" className="w-[46px] h-[38px]" alt="Logo" />
          <div className="flex flex-col items-center md:items-start">
            <div className="flex text-lg md:text-[20px] font-semibold">
              <p className="text-[#FAFAFA]">Nom</p>
              <p className="text-[#EF4444]">Nom</p>
            </div>
            <p className="text-[#F4F4F5] text-xs md:text-[12px]">
              Swift delivery
            </p>
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap items-start gap-10 md:gap-[112px]">
          <div className="flex flex-col items-start gap-4 text-sm md:text-[16px] text-white">
            <p className="text-[#71717A]">NOMNOM</p>
            <p className="cursor-pointer" onClick={home}>
              Home
            </p>
            <p>Contact us</p>
            <p>Delivery zone</p>
          </div>

          <div className="flex flex-wrap md:flex-nowrap items-start gap-8 md:gap-[56px]">
            <div className="flex flex-col items-start gap-4 text-sm md:text-[16px] text-white">
              <p className="text-[#71717A]">MENU</p>
              <p>Appetizers</p>
              <p>Salads</p>
              <p>Pizzas</p>
              <p>Lunch favorites</p>
              <p>Main dishes</p>
            </div>
            <div className="flex flex-col items-start gap-4 text-sm md:text-[16px] text-white">
              <p className="opacity-0">o</p>
              <p>Side dish</p>
              <p>Brunch</p>
              <p>Desserts</p>
              <p>Beverages</p>
              <p>Fish & Sea foods</p>
            </div>

            <div className="flex flex-col items-start gap-4">
              <p className="text-[#71717A] text-sm md:text-[16px]">FOLLOW US</p>
              <div className="flex py-1 justify-center items-start gap-4">
                <img
                  src="fb.png"
                  className="w-[28px] h-[28px]"
                  alt="Facebook"
                />
                <img
                  src="ig.png"
                  className="w-[28px] h-[28px]"
                  alt="Instagram"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full py-6 justify-start px-6 md:px-28 items-start md:items-center gap-4 md:gap-12 border-t border-[#848484] text-[#71717A] text-xs md:text-[14px]">
        <div className="flex items-center gap-1">
          <p>Copy right 2024</p>
          <p>©</p>
          <p>Nomnom LLC</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <p>Privacy policy</p>
          <p>Terms and condition</p>
          <p>Cookie policy</p>
        </div>
      </div>
    </div>
  );
};
