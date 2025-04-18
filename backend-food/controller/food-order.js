import { FoodOrderModel } from "../model/food-order-model.js";

export const createFoodOrder = async (req, res) => {
  const { userId, foods, totalPrice } = req.body;

  try {
    const foodOrder = await FoodOrderModel.create({
      foods: foods,
      totalPrice: totalPrice,
      userId: userId,
    });
    res
      .status(200)
      .send({
        success: true,
        foodOrder: foodOrder,
      })
      .end();
  } catch (error) {
    console.log(error, "err");
    return res
      .status(400)
      .send({
        success: false,
        message: error,
      })
      .end();
  }
};

export const getFoodOrders = async (__, res) => {
  try {
    const foodOrders = await FoodOrderModel.find()
      .populate("foodIds")
      .populate("userId");
    return res
      .status(200)
      .send({
        success: true,
        foodOrders: foodOrders,
      })
      .end();
  } catch (error) {
    console.error(error, "err");
    return res
      .status(400)
      .send({
        success: false,
        message: error,
      })
      .end();
  }
};

export const getFoodOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const foodOrder = await FoodOrderModel.findById(id)
      .populate("foodIds")
      .populate("userId");
    return res
      .status(200)
      .send({
        success: true,
        foodOrder: foodOrder,
      })
      .end();
  } catch (error) {
    console.error(error, "err");
    return res
      .status(400)
      .send({
        success: false,
        message: error,
      })
      .end();
  }
};

export const getFoodOrderByFoodId = async (req, res) => {
  const { foodIds } = req.body;
  try {
    const foodOrder = await FoodOrderModel.find({
      foodIds: foodIds,
    })
      .populate("foodIds")
      .populate("userId");

    return res
      .status(200)
      .send({
        success: true,
        foodOrder: foodOrder,
      })
      .end();
  } catch (error) {
    console.error(error, "err");
    return res
      .status(400)
      .send({
        success: false,
        message: error,
      })
      .end();
  }
};

export const getFoodOrder = async (req, res) => {
  const { userId } = req.body;
  try {
    const foodOrder = await FoodOrderModel.find({
      userId: userId,
    }).populate("foodIds");

    return res
      .status(200)
      .send({
        success: true,
        foodOrder: foodOrder,
      })
      .end();
  } catch (error) {
    console.error(error, "err");
    return res
      .status(400)
      .send({
        success: false,
        message: error,
      })
      .end();
  }
};
