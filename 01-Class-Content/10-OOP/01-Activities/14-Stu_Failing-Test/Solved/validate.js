// TODO: Define a Validate class with an isPassword() function that takes in a password parameter.

class Validate {}

Validate.prototype.isPassword = function (password) {
  if (!password) {
    return false;
  }
};

// TODO: Export the Validate class from this file.

module.exports = Validate;
