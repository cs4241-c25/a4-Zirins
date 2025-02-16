const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    content: { type: String, required: true },
    priority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High']
    },
    dueDate: { type: Date, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);