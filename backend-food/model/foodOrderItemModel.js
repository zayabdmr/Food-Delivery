import mongoose, { Schema } from "mongoose";

const foodOrderItemSchema = new mongoose.Schema({
  food: {
    type: [Schema.Types.ObjectId],
    ref: "Food",
  },
  quantity: {
    type: String,
    required: true,
  },
});

export const FoodCategoryModel = mongoose.model(
  "FoodCategory",
  foodCategorySchema
);
