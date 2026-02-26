import todoSchema from "../models/todoSchema.js";

export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const existing = await todoSchema.findOne({
      title: title,
      userId: req.userId,
    });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "tittle already exists",
      });
    }
    const data = await todoSchema.create({
      title,
      userId: req.userId,
    });
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "todo not created",
      });
    }
    return res.status(201).json({
      success: true,
      message: "todo created sucessfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const data = await todoSchema.find({
      userId: req.userId,
    });
   
    return res.status(200).json({
      success: true,
      message: "todo fetched sucessfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
