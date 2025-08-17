import { ProductList } from "./ProductList";

export const AllDishesPage = () => {
  return (
    <div className="bg-[#F4F4F5] min-h-screen w-full">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-6 space-y-6">
        <div className="flex justify-end">
          <img
            src="/avatar.jpg"
            alt="User Avatar"
            className="w-9 h-9 rounded-full object-cover"
          />
        </div>

        <ProductList />
      </div>
    </div>
  );
};
