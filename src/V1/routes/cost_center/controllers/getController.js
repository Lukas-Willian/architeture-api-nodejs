//Defaults imports
const asyncHandler = require("express-async-handler");

//Controllers

//Models
const User = require("../../../models/user/user");
const Costcenter = require("../../../models/cost_center/cost_center");

//Utils
const errorGenerator = require("../../../utils/error_generator/error_generator");

exports.all_costcenter = asyncHandler(async (req, res) => {
  try {
    const find_costcenter = await Costcenter.find();
    if (find_costcenter.length == 0)
      errorGenerator({ message: "Costcenter not found!", status: 404 });
    return res.status(200).json({ data: find_costcenter });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
exports.costcenter = asyncHandler(async (req, res) => {
  try {
    const find_costcenter = await Costcenter.findOne({ _id: req.params.id });
    if (!find_costcenter)
      errorGenerator({ message: "Costcenter not found!", status: 404 });
    return res.status(200).json({ data: find_costcenter });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
exports.costcenter_per_user = asyncHandler(async (req, res) => {
  try {
    const find_costcenter = await Costcenter.find({
      "data_information.user_id": req.params.id,
    });
    if (find_costcenter.length == 0)
      errorGenerator({ message: "Costcenter not found!", status: 404 });
    return res.status(200).json({ data: find_costcenter });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
exports.costcenter_per_campaign = asyncHandler(async (req, res) => {
  try {
    const find_costcenter = await Costcenter.find({
      "data_information.campaign": { $in: req.params.id },
    });
    if (find_costcenter.length == 0)
      errorGenerator({ message: "Costcenter not found!", status: 404 });
    return res.status(200).json({ data: find_costcenter });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
