"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";
import { Pen, Plus, UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash, X } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Product = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  categoryIds: string;
};

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");

  const router = useRouter();

  const handleOnclick = (id: string) => {
    router.push(`/searchFilter?product=${id}`);
  };

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axiosInstance.get("/food");
        setProducts(response.data.food);
      } catch (error) {
        console.error("Error fetching food:", error);
      }
    };

    fetchFood();
  }, []);

  return (
    <div className="w-screen">
      <div className="space-y-6  py-[24px]">
        <div className="w-[1171px] bg-[#FFF] rounded-xl p-6">
          <h4 className="text-[#09090B] text-[20px] font-semibold mb-4">
            Appetizers ({products.length})
          </h4>

          <div className="flex flex-wrap gap-4">
            <div className="w-[270px] h-[241px] flex flex-col justify-center items-center gap-4 border-2 border-dashed border-[#EF4444] rounded-[20px]">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-[40px] h-[40px] bg-[#EF4444] rounded-full">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add new Dish to Appetizers</DialogTitle>
                  </DialogHeader>

                  <div className="flex gap-4 py-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="foodName">Food name</Label>
                      <Input id="foodName" placeholder="Type food name" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="foodPrice">Food price</Label>
                      <Input id="foodPrice" placeholder="Enter price..." />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mb-4">
                    <Label htmlFor="ingredients">Ingredients</Label>
                    <textarea
                      id="ingredients"
                      placeholder="List ingredients..."
                      className="w-full h-[112px] rounded-md border border-gray-300 p-2 resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2 mb-4">
                    <Label htmlFor="foodImage">Food image</Label>
                    <div className="w-full h-[160px] border-2 border-dashed border-gray-300 flex items-center justify-center text-sm text-gray-500 rounded-md bg-gray-50">
                      <div className="text-center">
                        <UploadIcon className="mx-auto mb-2" />
                        <p>Choose a file or drag & drop it here</p>
                        <input
                          type="file"
                          id="foodImage"
                          className="hidden"
                          onChange={(e) => console.log(e.target.files)}
                        />
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type="submit">Add Dish</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <p className="text-[14px] font-medium text-center w-[154px]">
                Add new Dish to <br /> Appetizers
              </p>
            </div>

            {products.map((product) => (
              <div
                key={product._id}
                className="bg-[#FFF] w-[270px] h-[241px] p-[16px] rounded-[20px] relative border border-[#E4E4E7]"
              >
                <div className="relative">
                  <img
                    className="w-[238px] h-[129px] rounded-[12px] object-cover"
                    src={product.image}
                    alt={product.foodName}
                  />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="absolute bottom-[12px] right-[12px] w-[40px] h-[40px] bg-white rounded-full">
                        <Pen size={16} className="text-[#EF4444]" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[500px] p-6 rounded-xl">
                      <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">
                          Dishes info
                        </DialogTitle>
                      </DialogHeader>

                      <div className="flex flex-col gap-4 py-4">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="foodName">Dish name</Label>
                          <Input
                            id="foodName"
                            value={product.foodName}
                            onChange={(e) => setFoodName(e.target.value)}
                            className="w-[264px]"
                          />
                        </div>

                        <div className="flex justify-between items-center">
                          <Label>Dish category</Label>
                          <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="w-[264px]">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem
                                value={product.categoryIds}
                              ></SelectItem>
                              <SelectItem value="Main">Main</SelectItem>
                              <SelectItem value="Dessert">Dessert</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex justify-between items-center">
                          <Label htmlFor="ingredients">Ingredients</Label>
                          <textarea
                            id="ingredients"
                            value={product.ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            className="w-[264px] h-[100px] rounded-md border border-gray-300 p-2 resize-none text-sm"
                          />
                        </div>

                        <div className="flex justify-between items-center">
                          <Label htmlFor="foodPrice">Price</Label>
                          <Input
                            id="foodPrice"
                            value={product.price}
                            onChange={(e) => setFoodPrice(e.target.value)}
                            className="w-[264px]"
                          />
                        </div>

                        <div className="flex justify-between items-center">
                          <Label>Image</Label>
                          <div className="relative w-[264px] h-[120px] rounded-md overflow-hidden">
                            <img
                              src={product.image}
                              alt="preview"
                              className="w-full h-full object-cover rounded-md"
                            />
                            <Button
                              size="icon"
                              className="absolute top-1 right-1 w-6 h-6 p-0 bg-white text-black rounded-full shadow-md"
                              onClick={() => setImage("")}
                            >
                              <X size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <Button
                          variant="ghost"
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash size={16} className="mr-1" />
                          Delete
                        </Button>
                        <DialogFooter>
                          <Button className="bg-black text-white rounded-md">
                            Save changes
                          </Button>
                        </DialogFooter>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center justify-between pt-[20px] pb-[8px]">
                  <h3 className="text-[#EF4444] text-[14px] font-medium line-clamp-1">
                    {product.foodName}
                  </h3>
                  <p className="text-[#09090B] text-[12px]">₮{product.price}</p>
                </div>

                <p className="text-[#09090B] text-[14px] font-normal leading-snug line-clamp-2">
                  {product.ingredients}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
