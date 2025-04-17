import mongoose from "mongoose";

const foodCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const FoodCategoryModel = mongoose.model(
  "FoodCategory",
  foodCategorySchema
);
