import { FoodCategoryModel } from "../model/food-category-model.js";

export const createFoodCategory = async (req, res) => {
  const { categoryName } = req.body;
  if (!categoryName) {
    return res.status(400).send({
      success: false,
      message: "Category name is required",
    });
  }
  try {
    const foodCategory = await FoodCategoryModel.create({ categoryName });
    return res.status(201).send({
      success: true,
      data: foodCategory,
      message: "Category created successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const getFoodCategories = async (req, res) => {
  try {
    const foodCategories = await FoodCategoryModel.find();
    return res.status(200).send({
      success: true,
      data: foodCategories,
      message: "Categories fetched successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const getFoodCategoryById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({
      success: false,
      message: "Category ID is required",
    });
  }
  try {
    const foodCategory = await FoodCategoryModel.findById(id);
    if (!foodCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(200).send({
      success: true,
      data: foodCategory,
      message: "Category fetched successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const deleteFoodCategoryById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({
      success: false,
      message: "Category ID is required",
    });
  }
  try {
    const result = await FoodCategoryModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const updateFoodCategoryById = async (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "Category ID is required",
    });
  }
  if (!categoryName) {
    return res.status(400).send({
      success: false,
      message: "Category name is required",
    });
  }

  try {
    const foodCategory = await FoodCategoryModel.findByIdAndUpdate(
      id,
      { categoryName },
      { new: true, runValidators: true }
    );

    if (!foodCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).send({
      success: true,
      data: foodCategory,
      message: "Category updated successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "Server error",
    });
  }
};
