const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String
});

module.exports = mongoose.model('Data', DataSchema);