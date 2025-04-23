import { FoodOrderModel } from "../model/food-order-model.js";

export const createFoodOrder = async (req, res) => {
  const { userId, foodOrderItems, totalPrice } = req.body;

  try {
    const foodOrder = await FoodOrderModel.create({
      user: userId,
      foodOrderItems,
      totalPrice,
    });

    return res.status(201).send({
      success: true,
      foodOrder,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message || "Failed to create order",
    });
  }
};

export const getFoodOrders = async (req, res) => {
  try {
    const foodOrders = await FoodOrderModel.find().populate("user");

    return res.status(200).send({
      success: true,
      foodOrders,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message || "Failed to fetch orders",
    });
  }
};

export const getFoodOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const foodOrder = await FoodOrderModel.findById(id).populate("user");

    if (!foodOrder) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).send({
      success: true,
      foodOrder,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message || "Failed to fetch order",
    });
  }
};

export const getOrderByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const foodOrders = await FoodOrderModel.find({ user: userId }).populate("user");

    return res.status(200).send({
      success: true,
      foodOrders,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message || "Failed to fetch user's orders",
    });
  }
};

export const updateFoodOrderById = async (req, res) => {
  const { id } = req.params;
  const { userId, foodOrderItems, totalPrice } = req.body;

  try {
    const foodOrder = await FoodOrderModel.findByIdAndUpdate(
      id,
      {
        user: userId,
        foodOrderItems,
        totalPrice,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!foodOrder) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Order updated",
      foodOrder,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message || "Failed to update order",
    });
  }
};
