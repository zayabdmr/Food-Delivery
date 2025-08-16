import mongoose, { Schema } from "mongoose";

// Food Order Item schema
const foodOrderItemSchema = new mongoose.Schema(
  {
    food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false } // тусдаа _id үүсгэхгүй
);

// Food Order schema
const foodOrderSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalPrice: { type: Number, required: true },
    foodOrderItems: { type: [foodOrderItemSchema], required: true },
    status: {
      type: String,
      enum: ["PENDING", "CANCELLED", "DELIVERED"],
      default: "PENDING",
    },
    deliveryMockAddress: { type: String },
    orderDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const FoodOrderModel = mongoose.model("FoodOrder", foodOrderSchema);
export default FoodOrderModel;
