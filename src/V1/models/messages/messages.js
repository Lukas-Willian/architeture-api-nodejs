//Defaults imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Default Variables
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  basic_information: {
    name: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: Boolean, required: true },
  },
  data_information: {
    user_id: { type: String, required: true },
    messages: { type: Array, required: false },
  },
  created_date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Message", messageSchema);
