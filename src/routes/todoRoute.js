import express from "express";
import { createTodo, getAll } from "../controllers/todoController.js";
import { hasToken } from "../middleware/hasToken.js";

const todoRoute = express.Router()

todoRoute.post("/create",hasToken, createTodo)
todoRoute.get("/getAll",hasToken, getAll)

export default todoRoute;