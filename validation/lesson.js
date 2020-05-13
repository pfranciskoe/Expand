const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLessonInput(data) {
    let errors = {};
    data.title = validText(data.title) ? data.title : '';

    if (!Validator.isLength(data.title, { min:2, max: 80 })) {
        errors.title = 'Title must be between 2 and 80 characters';
    }

    if (Validator.isEmpty(data.title)) {
        errors.title = 'title field is required';
    }

    data.description = validText(data.description) ? data.description : '';

    if (!Validator.isLength(data.description, { min: 2, max: 80 })) {
        errors.description = 'description must be between 2 and 80 characters';
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = 'description field is required';
    }

    // if (Validator.isEmpty(data.videoUrl)) {
    //     errors.videoUrl = 'videoUrl field is required';
    // }
    
    if (Validator.isEmpty(data.instructor)) {
        errors.instructor = 'instructor field is required';
    }

    if (Validator.isEmpty(data.course)) {
        errors.course = 'course field is required';
    }

    if (Validator.isEmpty(data.order)) {
        errors.order = 'order field is required';
    }

    if (Validator.isEmpty(data.thumbnailUrl)) {
        errors.thumbnailUrl = 'thumbnailUrl field is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};