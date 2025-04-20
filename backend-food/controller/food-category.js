import { FoodCategoryModel } from "../model/food-category-model.js";

export const createFoodCategory = async (req, res) => {
  const { categoryName } = req.body;

  try {
    const foodCategory = await FoodCategoryModel.create({
      categoryName: categoryName,
    });
    res
      .status(200)
      .send({
        success: true,
        foodCategory: foodCategory,
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

export const getFoodCategories = async (__, res) => {
  try {
    const foodCategory = await FoodCategoryModel.find();
    return res
      .status(200)
      .send({
        success: true,
        foodCategory: foodCategory,
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

export const getFoodCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const foodCategory = await FoodCategoryModel.findById(id);
    return res
      .status(200)
      .send({
        success: true,
        foodCategory: foodCategory,
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
