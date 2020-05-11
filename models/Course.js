const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    students: [],
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    lessons: [],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Course = mongoose.model('course', CourseSchema);