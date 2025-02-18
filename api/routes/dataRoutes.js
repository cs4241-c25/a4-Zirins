const express = require('express');
const Task = require('../models/Task');
const calculateUrgencyScore = require('../utils/urgencyScore'); // ✅ Import urgency function
const router = express.Router();

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ error: "Not authenticated" });
};

// ✅ Get all tasks sorted by urgency score
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id }).sort({ urgencyScore: -1 }); // Sort highest urgency first
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Add new task with urgency score
router.post('/add', isAuthenticated, async (req, res) => {
    try {
        const { content, priority, dueDate } = req.body;

        const urgencyScore = calculateUrgencyScore(priority, dueDate); // ✅ Calculate urgency

        const newTask = new Task({
            content,
            priority,
            dueDate,
            urgencyScore, // ✅ Store urgency score
            userId: req.user._id
        });

        await newTask.save();
        res.json({ message: "Task added", task: newTask });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Update task with urgency score recalculation
router.put('/update/:id', isAuthenticated, async (req, res) => {
    try {
        const { content, priority, dueDate } = req.body;

        const urgencyScore = calculateUrgencyScore(priority, dueDate); // ✅ Recalculate urgency

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { content, priority, dueDate, urgencyScore }, // ✅ Update urgency too
            { new: true }
        );

        if (!task) return res.status(404).json({ error: "Task not found" });

        res.json({ message: "Task updated", task });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Delete task
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
