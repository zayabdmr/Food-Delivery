import mongoose from "mongoose";

const foodOrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  foodOrderItems: {
    type: [foodOrderItemSchema],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Canceled", "Delivered"],
    default: "Pending",
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

export const FoodOrderModel = mongoose.model("FoodOrder", foodOrderSchema);
