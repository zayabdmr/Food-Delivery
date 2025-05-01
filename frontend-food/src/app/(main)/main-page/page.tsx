import { ProductCard } from "@/app/components/ProductCard";

export default function Home() {
  return (
    <div>
      <img
        src="specialOffer.png"
        className="w-screen h-[570px] object-left bg-cover"
      />
      <ProductCard />
    </div>
  );
}
