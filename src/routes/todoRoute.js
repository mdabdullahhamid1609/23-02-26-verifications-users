import express from "express";
import { createTodo, deleteTodo, getAll, paginateTodo, updatedId } from "../controllers/todoController.js";
import { hasToken } from "../middleware/hasToken.js";

const todoRoute = express.Router()

todoRoute.post("/create",hasToken, createTodo)
todoRoute.get("/getAll",hasToken, getAll)
todoRoute.delete("/delete/:id", hasToken, deleteTodo)
todoRoute.put("/update/:id", hasToken, updatedId)
todoRoute.get('/paginate', hasToken, paginateTodo)

export default todoRoute;