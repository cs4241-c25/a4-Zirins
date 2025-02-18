const mongoose = require('mongoose');
calculateUrgencyScore = require('../utils/UrgencyScore');

const taskSchema = new mongoose.Schema({
    content: { type: String, required: true },
    priority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High']
    },
    dueDate: { type: Date, required: true },
    urgencyScore: {
        type: Number
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

// Middleware to calculate urgency before saving
taskSchema.pre('save', function (next) {
    if (this.dueDate && this.priority) {
        this.urgencyScore = calculateUrgencyScore(this.priority, this.dueDate);
    }
    next();
});

module.exports = mongoose.model('Task', taskSchema);