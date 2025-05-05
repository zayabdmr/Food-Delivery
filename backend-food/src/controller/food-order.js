import { FoodOrderModel } from "../model/food-order-model.js";

export const createFoodOrder = async (req, res) => {
  const { userId, foodOrderItems, totalPrice } = req.body;

  if (!userId || !foodOrderItems || !totalPrice) {
    return res.status(400).send({
      success: false,
      message: "userId, foodOrderItems, totalPrice бүгд шаардлагатай",
    });
  }

  try {
    const foodOrder = await FoodOrderModel.create({
      user: userId,
      foodOrderItems,
      totalPrice,
    });

    return res.status(201).send({
      success: true,
      data: foodOrder,
      message: "Order created successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const getFoodOrders = async (req, res) => {
  try {
    const foodOrders = await FoodOrderModel.find()
      .populate("user")
      .populate("foodOrderItems.food");

    return res.status(200).send({
      success: true,
      data: foodOrders,
      message: "Orders fetched successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const getFoodOrderById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "Order ID is required",
    });
  }

  try {
    const foodOrder = await FoodOrderModel.findById(id)
      .populate("user")
      .populate("foodOrderItems.food");

    if (!foodOrder) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).send({
      success: true,
      data: foodOrder,
      message: "Order fetched successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const getOrderByUser = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).send({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    const foodOrders = await FoodOrderModel.find({ user: userId })
      .populate("user")
      .populate("foodOrderItems.food");

    return res.status(200).send({
      success: true,
      data: foodOrders,
      message: "Orders fetched successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const deleteFoodOrderById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "Order ID is required",
    });
  }

  try {
    const foodOrder = await FoodOrderModel.findByIdAndDelete(id);

    if (!foodOrder) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Order deleted successfully",
      data: foodOrder,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const updateFoodOrderById = async (req, res) => {
  const { id } = req.params;
  const { userId, foodOrderItems, totalPrice } = req.body;

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "Order ID is required",
    });
  }

  try {
    const foodOrder = await FoodOrderModel.findByIdAndUpdate(
      id,
      { user: userId, foodOrderItems, totalPrice },
      { new: true, runValidators: true }
    );

    if (!foodOrder) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Order updated successfully",
      data: foodOrder,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "Server error",
    });
  }
};
