import { Types } from "mongoose";
import { FoodCategoryModel } from "../model/food-category-model.js";
import { FoodModel } from "../model/food-model.js";

export const createFood = async (req, res) => {
  const { foodName, price, image, ingredients, category } = req.body;

  if (!foodName || !price || !image || !category) {
    return res.status(400).send({
      success: false,
      message: "error",
    });
  }

  try {
    const food = await FoodModel.create({
      foodName,
      price,
      image,
      ingredients,
      category,
    });

    res.status(201).send({
      success: true,
      foods: food,
      message: "Food created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: error.message || "Failed to create food",
    });
  }
};

export const getFoods = async (req, res) => {
  try {
    const foods = await FoodModel.find().populate("category");
    res.status(200).send({
      success: true,
      data: foods,
      message: "Foods fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: error.message || "Failed to fetch foods",
    });
  }
};

export const getFoodById = async (req, res) => {
  const { id } = req.params;

  try {
    const food = await FoodModel.findById(id).populate("category");

    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).send({
      success: true,
      data: food,
      message: "Food fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: error.message || "Failed to fetch food",
    });
  }
};

export const getFoodByCategoryId = async (req, res) => {
  const { categoryId } = req.query;

  const match = categoryId
    ? {
        $match: {
          _id: new Types.ObjectId(categoryId),
        },
      }
    : { $match: {} };

  try {
    const categoriesWithFoods = await FoodCategoryModel.aggregate([
      match,
      {
        $lookup: {
          from: "foods",
          localField: "_id",
          foreignField: "category",
          as: "foods",
        },
      },
      {
        $project: {
          categoryName: 1,
          foods: 1,
        },
      },
    ]);

    return res.status(200).send({
      success: true,
      foods: categoriesWithFoods,
    });
  } catch (error) {
    console.error(error, "Error while fetching foods by category");
    return res.status(500).send({
      success: false,
      message: error.message || "Failed to fetch foods by category",
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

    res.status(200).send({
      success: true,
      message: "Food deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: error.message || "Failed to delete food",
    });
  }
};

export const updateFoodById = async (req, res) => {
  const { id } = req.params;
  const { foodName, price, image, ingredients, category } = req.body;

  try {
    const food = await FoodModel.findByIdAndUpdate(
      id,
      { foodName, price, image, ingredients, category },
      { new: true, runValidators: true }
    ).populate("category");

    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Food updated successfully",
      data: food,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: error.message || "Failed to update food",
    });
  }
};
