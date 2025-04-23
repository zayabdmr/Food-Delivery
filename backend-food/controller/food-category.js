import { FoodCategoryModel } from "../model/food-category-model.js";

export const createFoodCategory = async (req, res) => {
  const { categoryName } = req.body;

  try {
    const foodCategory = await FoodCategoryModel.create({ categoryName });
    res.status(201).send({
      success: true,
      foodCategory,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message || "Failed to create category",
    });
  }
};

export const getFoodCategories = async (__, res) => {
  try {
    const foodCategory = await FoodCategoryModel.find();
    return res.status(200).send({
      success: true,
      foodCategory,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message || "Failed to fetch categories",
    });
  }
};

export const getFoodCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const foodCategory = await FoodCategoryModel.findById(id);
    return res.status(200).send({
      success: true,
      foodCategory,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message || "Failed to fetch category",
    });
  }
};

export const deleteFoodCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await FoodCategoryModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.send({
      success: true,
      message: "Category deleted",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message || "Failed to delete category",
    });
  }
};

export const updateFoodCategoryById = async (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;

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

    res.send({
      success: true,
      message: "Category updated",
      foodCategory,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message || "Failed to update category",
    });
  }
};
