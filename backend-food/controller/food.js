import { FoodCategoryModel } from "../model/food-category-model.js";
import { FoodModel } from "../model/food-model.js";

export const createFood = async (req, res) => {
  const { foodName, price, image, ingredients, categoryIds } = req.body;

  try {
    const food = await FoodModel.create({
      foodName,
      price,
      image,
      ingredients,
      categoryIds,
    });

    res.status(201).send({
      success: true,
      food,
    });
  } catch (error) {
    console.error(error, "err");
    res.status(400).send({
      success: false,
      message: error.message || "Failed to create food",
    });
  }
};

export const getFoods = async (__, res) => {
  try {
    const food = await FoodModel.find().populate("categoryIds");
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.error(error, "err");
    res.status(400).send({
      success: false,
      message: error.message || "Failed to fetch foods",
    });
  }
};

export const getFoodById = async (req, res) => {
  const { id } = req.params;

  try {
    const food = await FoodModel.findById(id).populate("categoryIds");
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.error(error, "err");
    res.status(400).send({
      success: false,
      message: error.message || "Failed to fetch food",
    });
  }
};

export const getFoodByCategoryId = async (req, res) => {
  const { categoryIds } = req.params;

  try {
    const food = await FoodModel.find({ categoryIds }).populate("categoryIds");
    const category = await FoodCategoryModel.findById(categoryIds);
    res.status(200).send({
      success: true,
      category: category,
      foods: food,
    });
  } catch (error) {
    console.error(error, "err");
    res.status(400).send({
      success: false,
      message: error.message || "Failed to fetch food by category",
    });
  }
};

export const deleteFoodById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await FoodModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    res.send({
      success: true,
      message: "Food deleted",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message || "Failed to delete food",
    });
  }
};

export const updateFoodById = async (req, res) => {
  const { id } = req.params;
  const { foodName, price, image, ingredients, categoryIds } = req.body;

  try {
    const food = await FoodModel.findByIdAndUpdate(
      id,
      { foodName, price, image, ingredients, categoryIds },
      { new: true, runValidators: true }
    );

    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    res.send({
      success: true,
      message: "Food updated",
      food,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message || "Failed to update food",
    });
  }
};
