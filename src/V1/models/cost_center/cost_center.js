//Defaults imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Default Variables
const Schema = mongoose.Schema;

const costCenterSchema = new Schema({
  basic_information: {
    name: { type: String, required: false },
  },
  data_information: {
    user_id: { type: String, required: false },
    campaign: { type: [String], required: false },
  },
  created_date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Costcenter", costCenterSchema);
