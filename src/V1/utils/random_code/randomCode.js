function randomCode(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLenght = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.random() * charactersLenght);
  }

  return result;
}

module.exports = randomCode;
