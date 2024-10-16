//Defaults imports
const asyncHandler = require("express-async-handler");

//Controllers

//Models
const User = require("../../../models/user/user");
const Campaign = require("../../../models/campaign/campaign");
const Contact = require("../../../models/contact/contact");

//Utils
const errorGenerator = require("../../../utils/error_generator/error_generator");

exports.all_contact = asyncHandler(async (req, res) => {
  try {
    const find_contact = await Contact.find();
    if (!find_contact)
      errorGenerator({ message: "Contact not found!", status: 404 });
    return res.status(200).json({ data: find_contact });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
exports.contact = asyncHandler(async (req, res) => {
  try {
    const find_contact = await Contact.findOne({ _id: req.params.id });
    if (!find_contact)
      errorGenerator({ message: "Contact not found!", status: 404 });
    return res.status(200).json({ data: find_contact });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
exports.contact_per_user = asyncHandler(async (req, res) => {
  try {
    const find_contact = await Contact.find({
      "data_information.user_id": req.params.id,
    });
    if (find_contact.length == 0)
      errorGenerator({ message: "Contact not found!", status: 404 });
    return res.status(200).json({ data: find_contact });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
