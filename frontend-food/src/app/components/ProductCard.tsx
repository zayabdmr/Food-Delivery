import { Plus } from "lucide-react";

export const ProductCard = () => {
  return (
    <div className="bg-[#FFF] w-[398px] h-[342px] p-[16px] rounded-[20px] relative overflow-hidden">
      <div className="relative">
        <img
          className="w-[365px] h-[210px] rounded-[12px] object-cover"
          src="https://s3-alpha-sig.figma.com/img/4ff5/1a14/c041fc57196ebf52f07e524b5e4cc98c?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hgyh2PxfyoXHJOusus7v2jri6Qeninz8zRF9viWJVSUevQYJ0VYhfmfCi9fz2DPcfmzy4Xw0QI4s-~GKJL6nno3SqZY73blZanbyQW5~MgavIES4~Qv5qtlzc9eG4QGArINo-YbsJJabBr~U12RfuhGLjmlZHH0nUoqrSYG2APMSYUrw-WXyY4BHwJ-WNkB9UA~RGl0rmdfMnBPglgHa0x2kvPWz8s-bGAYE1fznjkt97-~J7ff~K3nGQeO-JQzCJPUv1aGQNLmLmkTNlkO1VMp3VfZoE~p8QNWHUsf2VgMV6Xd9QcXkogi687kAJwZsjEVkPCvwvf8PvjHJml2I4Q__"
          alt="Finger food"
        />
        <button className="absolute bottom-[12px] right-[12px] w-[44px] h-[44px] flex items-center justify-center bg-white rounded-full shadow-md">
          <Plus className="text-[#EF4444]" />
        </button>
      </div>

      <div className="font-semibold flex items-center justify-between pt-[20px] pb-[8px]">
        <h3 className="text-[#EF4444] text-[20px]">Finger food</h3>
        <p className="text-[#09090B] text-[18px] font-medium">$12.99</p>
      </div>
      <p className="text-[#09090B] text-[14px] font-normal leading-snug">
        Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.
      </p>
    </div>
  );
};
