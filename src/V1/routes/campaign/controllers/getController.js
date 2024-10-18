//Defaults imports
const asyncHandler = require("express-async-handler");

//Controllers

//Models
const User = require("../../../models/user/user");
const Campaign = require("../../../models/campaign/campaign");

//Utils
const errorGenerator = require("../../../utils/error_generator/error_generator");

exports.all_campaigns = asyncHandler(async (req, res) => {
  try {
    const find_campaign = await Campaign.find();
    if (!find_campaign)
      errorGenerator({ message: "Campaign not found!", status: 404 });
    return res.status(200).json({ data: find_campaign });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
exports.campaign = asyncHandler(async (req, res) => {
  try {
    const find_campaign = await Campaign.findOne({ _id: req.params.id });
    if (!find_campaign)
      errorGenerator({ message: "Campaign not found!", status: 404 });
    return res.status(200).json({ data: find_campaign });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
exports.campaign_per_user = asyncHandler(async (req, res) => {
  try {
    const find_campaign = await Campaign.find({
      "data_information.user_id": req.params.id,
    });
    if (find_campaign.length == 0)
      errorGenerator({ message: "Campaign not found!", status: 404 });

    return res.status(200).json({ data: find_campaign });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
exports.campaign_per_costcenter = asyncHandler(async (req, res) => {
  try {
    const find_campaign = await Campaign.find({
      "data_information.costcenter_id": req.params.id,
    });
    if (find_campaign.length == 0)
      errorGenerator({ message: "Campaign not found!", status: 404 });
    return res.status(200).json({ data: find_campaign });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
