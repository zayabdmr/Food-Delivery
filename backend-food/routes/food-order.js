import express from "express";
import { createFoodOrder, getOrderByUser } from "../controller/food-order.js";

export const foodOrderRouter = express.Router();

foodOrderRouter.post("/", createFoodOrder).get("/:userId", getOrderByUser);
