//Default imports
const mongoose = require("mongoose");
require("dotenv").config();

//Connect Mongoose
async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI).then((res) => {
      console.log("...Connect to MongoDb✅");
    });
  } catch (err) {
    return console.log(err);
  }
}

//Export
module.exports = {
  connect,
};
