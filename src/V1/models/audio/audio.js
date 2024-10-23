//Defaults imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Default Variables
const Schema = mongoose.Schema;

const audioSchema = new Schema({
  basic_information: {
    name: { type: String, required: true },
    archive_name: { type: String, required: false },
    description: { type: String, required: false },
    status: { type: Boolean, required: true },
  },
  data_information: {
    user_id: { type: String, required: true },
    archive_type: { type: String, required: false },
    archive: { type: String, required: false },
    duration: { type: Number, required: false },
  },
  created_date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Audio", audioSchema);
