const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: true,
    },
    videoUrl: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = Response = mongoose.model('Response', ResponseSchema);