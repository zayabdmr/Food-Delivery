import FoodOrderModel from "../model/food-order-model.js";

export const createFoodOrder = async (req, res) => {
  console.log("Create food order request:", req.body);
  console.log("User from token:", req.user);

  const { userId, foodOrderItems, totalPrice, deliveryMockAddress } = req.body;
  const finalUserId = userId || req.user?._id || req.user?.userId;

  if (!finalUserId || !foodOrderItems || !totalPrice) {
    return res.status(400).send({
      success: false,
      message: "userId, foodOrderItems, totalPrice are all required",
    });
  }

  if (!Array.isArray(foodOrderItems) || foodOrderItems.length === 0) {
    return res.status(400).send({
      success: false,
      message: "foodOrderItems must be a non-empty array",
    });
  }

  try {
    const foodOrder = await FoodOrderModel.create({
      user: finalUserId,
      foodOrderItems,
      totalPrice,
      deliveryMockAddress: deliveryMockAddress || "No address provided",
      status: "PENDING",
      orderDate: new Date(),
    });

    await foodOrder.populate("user", "-password");

    return res.status(201).send({
      success: true,
      data: foodOrder,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("Create food order error:", error);
    return res.status(500).send({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const getFoodOrders = async (req, res) => {
  try {
    const foodOrders = await FoodOrderModel.find()
      .populate("user", "-password")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      data: foodOrders,
      message: "Orders fetched successfully",
    });
  } catch (error) {
    console.error("Get food orders error:", error);
    return res.status(500).send({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const getFoodOrderById = async (req, res) => {
  const { id } = req.params;

  if (!id?.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({
      success: false,
      message: "Invalid order ID format",
    });
  }

  try {
    const foodOrder = await FoodOrderModel.findById(id).populate(
      "user",
      "-password"
    );

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
    console.error("Get food order by ID error:", error);
    return res.status(500).send({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const getOrderByUser = async (req, res) => {
  const { userId } = req.params;
  const finalUserId = userId || req.user?._id || req.user?.userId;

  if (!finalUserId?.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({
      success: false,
      message: "Invalid user ID format",
    });
  }

  try {
    const foodOrders = await FoodOrderModel.find({ user: finalUserId })
      .populate("user", "-password")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      data: foodOrders,
      message: "Orders fetched successfully",
    });
  } catch (error) {
    console.error("Get orders by user error:", error);
    return res.status(500).send({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const deleteFoodOrderById = async (req, res) => {
  const { id } = req.params;

  if (!id?.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({
      success: false,
      message: "Invalid order ID format",
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
      data: { id: foodOrder._id },
    });
  } catch (error) {
    console.error("Delete food order error:", error);
    return res.status(500).send({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const updateFoodOrderById = async (req, res) => {
  const { id } = req.params;
  const { userId, foodOrderItems, totalPrice, status, deliveryMockAddress } =
    req.body;

  if (!id?.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({
      success: false,
      message: "Invalid order ID format",
    });
  }

  try {
    const updateData = {};
    if (userId) updateData.user = userId;
    if (foodOrderItems) updateData.foodOrderItems = foodOrderItems;
    if (totalPrice) updateData.totalPrice = totalPrice;
    if (status) updateData.status = status;
    if (deliveryMockAddress)
      updateData.deliveryMockAddress = deliveryMockAddress;

    updateData.updatedAt = new Date();

    const foodOrder = await FoodOrderModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("user", "-password");

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
    console.error("Update food order error:", error);
    return res.status(500).send({
      success: false,
      message: error.message || "Server error",
    });
  }
};
