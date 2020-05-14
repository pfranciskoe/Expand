const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateResponseInput(data) {
    let errors = {};
    
    if (Validator.isEmpty(data.author)) {
        errors.author = 'Author field is required';
    }

    data.text = validText(data.text) ? data.text : '';
    if (!Validator.isLength(data.text, { max: 5000 })) {
        errors.text = 'Text must be fewer than 5000 characters';
    }

    if (Validator.isEmpty(data.parent)) {
        errors.parent = 'Parent field is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};