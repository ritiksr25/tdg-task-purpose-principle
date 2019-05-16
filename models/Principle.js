const mongoose = require('mongoose');

const PrincipleSchema = mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: { type: Date, default: Date.now }
})

module.exports = Principle = mongoose.model('Principle', PrincipleSchema);