import Task from "../models/task.js";

export const newTask = (req, res, next) => {
  const { title, description } = req.body;
  const task = Task.create({
    title,
    description,
    user: req.user,
  });
  res.status(200).json({ message: "Task created" });
};

export const getMyTask = async (req, res, next) => {
  const userid = req.user._id;
  const task = await Task.find({ user: userid });
  res.status(200).json({ success: true, task });
};


export const updateTask = async (req, res, next) => {
    const task = await Task.findById(req.params.id)
    task.isCompleted = !task.isCompleted
    await task.save();
  res.status(200).json({ message:"Task Updated "});
};


export const deleteTask = async (req, res, next) => {
    const task = Task.findById(req.params.id)
    await task.deleteOne();
  res.status(200).json({ success: true, message:"Task deleted " });
};
