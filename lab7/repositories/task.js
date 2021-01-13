const Task = require("../models/task");

const create = async (userId, name) => {
  const newTask = await Task.create({
    name: name,
    userId: userId
  });
  return newTask;
};

const findTaskByUserId = async (userId) => {
  const tasks = await Task.find({ userId: userId });
  return tasks;
};

const findTaskById = async(userId, taskId) => {
 const task = await Task.findOne({
   _id: taskId,
   userId
 })
 return task;
};

const update = async(userId, taskId, name) => {
  const task = await Task.findOne({_id: taskId, userId})
  if (!task){
    return
  }
  task.name = name;
  const newTask = await task.save()
  return newTask;
};

const deleteTask = async(userId, taskId) => {
  await Task.deleteOne({_id: taskId, userId});
};

module.exports = { findTaskByUserId, findTaskById, create, update, deleteTask };
