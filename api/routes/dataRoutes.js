const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ error: "Not authenticated" });
};

// Get all tasks for the logged-in user
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Add new task
router.post('/add', isAuthenticated, async (req, res) => {
    try {
        const newTask = new Task({
            content: req.body.content,
            priority: req.body.priority,
            dueDate: req.body.dueDate,
            userId: req.user._id
        });
        await newTask.save();
        res.json({ message: "Task added", task: newTask });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Update task (with ownership check)
router.put('/update/:id', isAuthenticated, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { content: req.body.content, priority: req.body.priority, dueDate: req.body.dueDate },
            { new: true }
        );
        if (!task) return res.status(404).json({ error: "Task not found" });
        res.json({ message: "Task updated", task });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Delete task (with ownership check)
router.delete('/delete/:id', isAuthenticated, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });
        if (!task) return res.status(404).json({ error: "Task not found" });
        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;