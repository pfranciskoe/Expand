const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.firstName = validText(data.firstName) ? data.firstName : '';
    data.lastName = validText(data.lastName) ? data.lastName : '';
    data.email = validText(data.email) ? data.email : '';
    

    if (!Validator.isLength(data.firstName, { min: 1, max: 30 })) {
        errors.firstName = 'First Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = 'First Name field is required';
    }

    if (!Validator.isLength(data.lastName, { min: 1, max: 30 })) {
        errors.lastName = 'last Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = 'last Name field is required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};