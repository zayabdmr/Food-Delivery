import { ProductCard } from "@/app/components/ProductCard";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <div>
        <img
          src="specialOffer.png"
          className="w-screen h-[570px] object-cover"
        />
        <ProductCard />
      </div>
    </Suspense>
  );
}
