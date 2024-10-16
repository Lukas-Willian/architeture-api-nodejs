//Defaults imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Default Variables
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  basic_information: {
    name: { type: String, required: true },
  },
  data_information: {
    user_id: { type: String, required: true },
    contact_list: { type: Array, required: false },
  },
  created_date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
