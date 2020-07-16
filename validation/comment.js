const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateCommentInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.author)) {
    errors.author = 'author field is required';
  }

  data.text = validText(data.text) ? data.text : '';
  if (!Validator.isLength(data.text, { max: 5000 })) {
    errors.text = 'Text must be fewer than 5000 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'text field is required';
  }

  if (Validator.isEmpty(data.lesson)) {
    errors.lesson = 'lesson field is required';
  }

  if (Validator.isEmpty(data.timestamp)) {
    errors.timestamp = 'timestamp field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
