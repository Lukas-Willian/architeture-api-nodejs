//Utils
const errorGenerator = require("../error_generator/error_generator");

function dataValidator(data, params_list) {
  let verify = params_list?.every((res) => res in data);
  if (!verify) {
    return false;
  }
  return true;
}

module.exports = dataValidator;
