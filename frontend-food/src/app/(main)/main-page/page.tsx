import { ProductCard } from "@/app/components/ProductCard";
import { Categories } from "./component/Categories";

export default function Home() {
  return (
    <div>
      <img src="specialOffer.png" className="w-screen h-[570px]" />
      <Categories />
      <ProductCard />
    </div>
  );
}
