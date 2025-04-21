import mongoose from "mongoose";
const { Schema } = mongoose;

const foodOrderItem = new mongoose.Schema(
  {
    food: {
      type: Schema.Types.ObjectId,
      ref: "Food",
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const foodOrderSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    foodOrderItems: { type: [foodOrderItem], required: true },
    status: {
      type: String,
      enum: ["PENDING", "CANCELED", "DELIVERED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export const FoodOrderModel = mongoose.model("FoodOrder", foodOrderSchema);
