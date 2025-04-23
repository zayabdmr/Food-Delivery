export default function Home() {
  return (
    <div>
      <div className="bg-[#FFF] w-[471px] h-[276px] flex flex-col p-4 gap-5">
        <h4 className="text-[#09090B] text-[20px] font-semibold">
          Payment info
        </h4>
        <div className="flex justify-between text-[16px]">
          <p className="text-[#71717A]">Payment info</p>
          <p className="text-[#09090B] font-bold">$25.98 </p>
        </div>

        <div className="flex justify-between text-[16px]">
          <p className="text-[#71717A] font-bold">Shipping</p>
          <p>0.99$</p>
        </div>

        <div className=""></div>

        <div className="flex justify-between text-[16px]">
          <p className="text-[#71717A] font-bold">Total</p>
          <p>$26.97</p>
        </div>
      </div>
      <button className="text-[#FAFAFA] text-[14px] font-medium w-[439px] h-[44px] bg-[#EF4444] rounded-full">
        Checkout
      </button>
    </div>
  );
}
