import { Suspense } from "react";
import { AllDishesPage } from "./component/AllDishesPage";

export default function Home() {
  return (
    <Suspense>
      <div>
        <AllDishesPage />
      </div>
    </Suspense>
  );
}
