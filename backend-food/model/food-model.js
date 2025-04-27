import mongoose, { Schema } from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    category: {
      type: [Schema.Types.ObjectId],
      ref: "FoodCategory",
    },
  },
  { timestamps: true }
);

export const FoodModel = mongoose.model("Food", foodSchema);
