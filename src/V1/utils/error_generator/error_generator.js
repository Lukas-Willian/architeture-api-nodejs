function errorGenerator(obj) {
  let error = new Error("Um erro ocorreu");
  error = obj;
  throw error;
}

module.exports = errorGenerator;
