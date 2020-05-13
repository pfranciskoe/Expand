const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    lesson: {
        type: Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true,
    },
    timestamp: {
        type: Number,
        required: true,
    },
    videoUrl: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = Comment = mongoose.model('Comment', CommentSchema);