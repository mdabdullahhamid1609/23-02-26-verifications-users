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



export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    const data = await todoSchema.findOneAndDelete({
      _id: todoId,
      userId: req.userId, // ensures ownership
    });

    console.log("data to del", data)
    console.log("userId", req.userId)
    console.log("todoId", todoId)

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Todo not found or not authorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data,
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const updatedId = async (req, res) => {
  try {
    const  todoId = req.params.id
    const {title} = req.body
    const data = await todoSchema.findOne({
      _id: todoId,
      userId: req.userId
    })
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Todo not found or not authorized",
      });
    }else{
      data.title = title;
       await data.save();
    
    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data,
    });
  }
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      sucess: false,
      message: "server error"
    })
  }
}


//paginated todos
export const paginateTodo = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 5; // 5 notes per page

    // Calculating the skip value
    const skip = (page - 1) * limit;   //p-7  l-3

    // Getting todos with pagination
    const todos = await todoSchema
      .find({ userId: req.userId })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Todos fetched as per query",
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: "Internal server error",
    });
  }
};





