//Defaults imports
const asyncHandler = require("express-async-handler");

//Controllers

//Models
const User = require("../../../models/user/user");
const Campaign = require("../../../models/campaign/campaign");
const Contact = require("../../../models/contact/contact");
const Blacklist = require("../../../models/blacklist/blacklist");

//Utils
const errorGenerator = require("../../../utils/error_generator/error_generator");

exports.all_blacklist_numbers = asyncHandler(async (req, res) => {
  try {
    const find_blacklist = await Blacklist.find();
    if (!find_blacklist)
      errorGenerator({ message: "Blacklist number not found!", status: 404 });
    return res.status(200).json({ data: find_blacklist });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
exports.blacklist_by_id = asyncHandler(async (req, res) => {
  try {
    const find_blacklist = await Blacklist.findOne({ _id: req.params.id });
    if (!find_blacklist)
      errorGenerator({ message: "Blacklist number not found!", status: 404 });
    return res.status(200).json({ data: find_blacklist });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
exports.blacklist_per_user = asyncHandler(async (req, res) => {
  try {
    const find_blacklist = await Blacklist.find({
      "data_information.user_id": req.params.id,
    });
    if (find_blacklist.length == 0)
      errorGenerator({ message: "Contact not found!", status: 404 });
    return res.status(200).json({ data: find_blacklist });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
