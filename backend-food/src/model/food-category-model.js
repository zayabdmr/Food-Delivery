import mongoose from "mongoose";

const foodCategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const FoodCategoryModel = mongoose.model(
  "FoodCategory",
  foodCategorySchema
);
