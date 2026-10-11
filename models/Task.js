
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: 1,
      maxlength: 100
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: ""
    },

    completed: {
      type: Boolean,
      default: false
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);