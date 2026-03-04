import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    taskName: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

// DEBUG: log the schema when this module is imported
console.log("Building Task schema; paths:", Object.keys(taskSchema.paths));

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
