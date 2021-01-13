const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  name: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const task = mongoose.model("Task", taskSchema);

module.exports = task;
