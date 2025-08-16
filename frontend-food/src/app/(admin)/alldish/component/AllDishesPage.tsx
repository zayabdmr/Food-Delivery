import { ProductList } from "../../orders/component/ProductList";

export const AllDishesPage = () => {
  return (
    <div className="bg-[#F4F4F5] min-h-screen w-full">
      <div className="max-w-[1440px] mx-auto space-y-6 px-4 md:px-[40px] py-[24px]">
        <div className="flex justify-end">
          <img
            className="w-[36px] h-[36px] rounded-full"
            src="https://s3-alpha-sig.figma.com/img/9d6d/cfc1/fb8cd40116ca161e463af1ee400a729e?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VpB7x1mfmNhpBmzKc2-WWwwRTpojHvVaAMruSqK10ODfOvqWijWnuOtslsLDUuC2PNepvVDMtW01vcJN3W14IK4Hzt7t2zGQnM2DB-Ryki9-iCXUoQmYZ8CqCNZJ1oypNSJEzIvSla7jGx-vNI6k0SWuGScH8TRKzUAbME8Gb80nUcaO7lxvDD-h4q0LzBxbY6VqvffnsS4WOtMTLmJ4xQvaOybtVeOfLrQB2zMz-GYluTz470rlS2qG~H-97PlIOy9QRMuTPMBcBV8BreAZNNyM2gozYFS6QVYbwlGLw~HsUgcx-UOMt5jDIWaOYt-gxtrAWQ8nT~B6-623SPX1BA__"
          />
        </div>

        <ProductList />
      </div>
    </div>
  );
};
