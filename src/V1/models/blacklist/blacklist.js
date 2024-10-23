//Defaults imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Default Variables
const Schema = mongoose.Schema;

const blackListSchema = new Schema({
  data_information: {
    user_id: { type: String, required: true },
    number: { type: Number, required: false },
  },
  expired_date: {
    type: Date,
    required: true,
  },
  created_date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Blacklist", blackListSchema);
