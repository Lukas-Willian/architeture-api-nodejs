//Defaults imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Default Variables
const Schema = mongoose.Schema;

const campaignSchema = new Schema({
  basic_information: {
    name: { type: String, required: false },
    type: { type: String, required: false },
    service_type: { type: String, required: false },
  },
  data_information: {
    user_id: { type: String, required: false },
    costcenter_id: { type: String, required: false },
    message: { type: Array, required: false },
    contact_list: { type: [String], required: false },
    delete_list: { type: [String], required: false },
    date: {
      schedule: { type: Array, required: false },
    },
    campaign_sends: {
      total: { type: Number, required: false, default: 0 },
      valid: { type: Number, required: false, default: 0 },
      invalid: { type: Number, required: false, default: 0 },
      send: { type: Number, required: false, default: 0 },
    },
  },
  created_date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Campaign", campaignSchema);
