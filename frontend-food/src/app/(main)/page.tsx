import { Suspense } from "react";
import { ProductCard } from "./_components/ProductCard";

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
