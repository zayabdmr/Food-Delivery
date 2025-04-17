import express from "express";
import { createFood, getFoodById, getFoods } from "../controller/food.js";

export const foodRouter = express.Router();

foodRouter.post("/", createFood).get("/:id", getFoodById).get("/", getFoods);
