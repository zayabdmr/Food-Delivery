import { FoodModel } from "../model/foodModel.js";

export const createFood = async (req, res) => {
  const { foodName, price, image, ingredients, categoryIds } = req.body;

  try {
    const food = await FoodModel.create({
      foodName: foodName,
      price: price,
      image: image,
      ingredients: ingredients,
      categoryIds: categoryIds,
    });
    res
      .status(200)
      .send({
        success: true,
        food: food,
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

export const getFoods = async (__, res) => {
  try {
    const food = await FoodModel.find().populate("categoryIds");
    return res
      .status(200)
      .send({
        success: true,
        food: food,
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

export const getFoodById = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await FoodModel.findById(id).populate("categoryIds");
    return res
      .status(200)
      .send({
        success: true,
        food: food,
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

export const getFoodsByCategoryId = async (req, res) => {
  const { categoryIds } = req.body;
  try {
    const food = await FoodModel.find({ categoryIds: categoryIds }).populate(
      "categoryIds"
    );

    return res
      .status(200)
      .send({
        success: true,
        food: food,
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
