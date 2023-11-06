import ErrorHandlier from "../middlewares/error.js";
import Task from "../models/task.js";

export const newTask = (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = Task.create({
      title,
      description,
      user: req.user,
    });
    res.status(200).json({ message: "Task created" });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const userid = req.user._id;
    const task = await Task.find({ user: userid });
    res.status(200).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandlier("task not found", 404));

    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({ message: "Task Updated " });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandlier("task not found", 404));
    await task.deleteOne();
    res.status(200).json({ success: true, message: "Task deleted " });
  } catch (error) {
    next(error);
  }
};
