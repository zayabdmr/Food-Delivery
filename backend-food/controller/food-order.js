import { FoodOrderModel } from "../model/food-order-model.js";
import { UserModel } from "../model/user-model.js";

export const createFoodOrder = async (req, res) => {
  const { userId, foodOrderItems, totalPrice } = req.body;

  try {
    const foodOrder = await FoodOrderModel.create({
      user: userId,
      foodOrderItems: foodOrderItems,
      totalPrice: totalPrice,
    });
    return res.status(200).send({
      success: true,
      foodOrder: foodOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

export const getOrderByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const foodOrder = await FoodOrderModel.find({
      user: userId,
    }).populate(["user"]);
    return res.status(200).send({
      success: true,
      foodOrder: foodOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
