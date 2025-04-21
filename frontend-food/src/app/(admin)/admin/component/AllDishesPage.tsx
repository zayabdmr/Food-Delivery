import { DishesCategory } from "./DishesCategory";
import { ProductList } from "./ProductList";

export const AllDishesPage = () => {
  return (
    <div className="bg-[#F4F4F5] w-screen h-screen">
      <div className="space-y-6 px-[40px] py-[24px]">
        <div className="w-screen">
          <img
            className="w-[36px] h-[36px] rounded-full flex justify-end items-end"
            src="https://s3-alpha-sig.figma.com/img/9d6d/cfc1/fb8cd40116ca161e463af1ee400a729e?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VpB7x1mfmNhpBmzKc2-WWwwRTpojHvVaAMruSqK10ODfOvqWijWnuOtslsLDUuC2PNepvVDMtW01vcJN3W14IK4Hzt7t2zGQnM2DB-Ryki9-iCXUoQmYZ8CqCNZJ1oypNSJEzIvSla7jGx-vNI6k0SWuGScH8TRKzUAbME8Gb80nUcaO7lxvDD-h4q0LzBxbY6VqvffnsS4WOtMTLmJ4xQvaOybtVeOfLrQB2zMz-GYluTz470rlS2qG~H-97PlIOy9QRMuTPMBcBV8BreAZNNyM2gozYFS6QVYbwlGLw~HsUgcx-UOMt5jDIWaOYt-gxtrAWQ8nT~B6-623SPX1BA__"
          />
        </div>
        <div className="w-[1171px] h-[176px] bg-[#FFF] rounded-xl p-6">
          <h4 className="text-[#09090B] text-[20px] font-semibold">
            Dishes category
          </h4>

          <DishesCategory />
        </div>
      </div>
      <ProductList />
    </div>
  );
};
