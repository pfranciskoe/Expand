const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
    fileLink: { type: String },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = Lesson = mongoose.model('Lesson', LessonSchema);