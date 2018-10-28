const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEventInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.date = !isEmpty(data.date) ? data.date : "";
  data.adress = !isEmpty(data.adress) ? data.adress : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.date)) {
    errors.date = "Date field is required";
  }

  if (Validator.isEmpty(data.adress)) {
    errors.adress = "Adress field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
