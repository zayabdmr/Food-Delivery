import { FoodOrderModel } from "../model/foodOrderModel.js";

export const createFoodOrder = async (req, res) => {
  const { user, totalPrice, foodOrderItems, status } = req.body;

  try {
    const foodOrder = await FoodOrderModel.create({
      user: user,
      totalPrice: totalPrice,
      foodOrderItems: foodOrderItems,
      status: status,
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
    const foodOrders = await FoodOrderModel.find();
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
    const foodOrder = await FoodOrderModel.findById(id);
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

// export const getFoodsOrderById = async (req, res) => {
//   const { categoryIds } = req.body;
//   try {
//     const food = await FoodModel.find({ categoryIds: categoryIds }).populate(
//       "categoryIds"
//     );

//     return res
//       .status(200)
//       .send({
//         success: true,
//         food: food,
//       })
//       .end();
//   } catch (error) {
//     console.error(error, "err");
//     return res
//       .status(400)
//       .send({
//         success: false,
//         message: error,
//       })
//       .end();
//   }
// };
