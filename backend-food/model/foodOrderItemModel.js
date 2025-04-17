import mongoose from "mongoose";

const foodOrderItemSchema = new mongoose.Schema({
  quantity: {
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
