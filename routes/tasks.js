
const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect every task route
router.use(authMiddleware);

// CREATE TASK
// POST /api/tasks
router.post("/", async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    if (
      typeof title !== "string" ||
      title.trim().length < 1 ||
      title.trim().length > 100
    ) {
      return res.status(400).json({
        message: "Title must contain 1-100 characters"
      });
    }

    if (
      description !== undefined &&
      (typeof description !== "string" ||
        description.length > 500)
    ) {
      return res.status(400).json({
        message: "Description must be a string of at most 500 characters"
      });
    }

    if (
      completed !== undefined &&
      typeof completed !== "boolean"
    ) {
      return res.status(400).json({
        message: "Completed must be true or false"
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description === undefined
        ? ""
        : description.trim(),
      completed: completed === undefined ? false : completed,
      user: req.userId
    });

    return res.status(201).json({
      message: "Task created",
      task
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error"
    });
  }
});

// READ ALL TASKS
// GET /api/tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.userId
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      count: tasks.length,
      tasks
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error"
    });
  }
});

// READ ONE TASK
// GET /api/tasks/:id
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid task ID"
      });
    }

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    return res.status(200).json({ task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error"
    });
  }
});

// UPDATE TASK
// PUT /api/tasks/:id
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid task ID"
      });
    }

    const { title, description, completed } = req.body;
    const allowedFields = ["title", "description", "completed"];

    if (
      !req.body ||
      typeof req.body !== "object" ||
      Array.isArray(req.body) ||
      Object.keys(req.body).length === 0 ||
      Object.keys(req.body).some(
        key => !allowedFields.includes(key)
      )
    ) {
      return res.status(400).json({
        message: "Provide valid task fields to update"
      });
    }

    const updates = {};

    if (title !== undefined) {
      if (
        typeof title !== "string" ||
        title.trim().length < 1 ||
        title.trim().length > 100
      ) {
        return res.status(400).json({
          message: "Title must contain 1-100 characters"
        });
      }

      updates.title = title.trim();
    }

    if (description !== undefined) {
      if (
        typeof description !== "string" ||
        description.length > 500
      ) {
        return res.status(400).json({
          message: "Description must be at most 500 characters"
        });
      }

      updates.description = description.trim();
    }

    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        return res.status(400).json({
          message: "Completed must be true or false"
        });
      }

      updates.completed = completed;
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    return res.status(200).json({
      message: "Task updated",
      task
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error"
    });
  }
});

// DELETE TASK
// DELETE /api/tasks/:id
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid task ID"
      });
    }

    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error"
    });
  }
});

module.exports = router;