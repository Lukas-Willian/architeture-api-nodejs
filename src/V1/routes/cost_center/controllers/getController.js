//Defaults imports
const asyncHandler = require("express-async-handler");

//Controllers

//Models
const User = require("../../../models/user/user");
const Costcenter = require("../../../models/cost_center/cost_center");
const Campaign = require("../../../models/campaign/campaign");

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

    const _documents = await Campaign.find({
      "data_information.costcenter_id": {
        $in: find_costcenter.map((res) => res._id),
      },
    }).select("basic_information data_information.costcenter_id");

    const filter_constcenter = find_costcenter.map((result) => {
      const document_filter = _documents.filter(
        (res) => res.data_information.costcenter_id == result?._id
      );
      const sms = document_filter.filter(
        (res) =>
          (res._id == res.basic_information.service_type.toLowerCase()) == "sms"
      ).length;
      const flash = document_filter.filter(
        (res) => res.basic_information.service_type.toLowerCase() == "flash"
      ).length;
      const token = document_filter.filter(
        (res) => res.basic_information.service_type.toLowerCase() == "token"
      ).length;
      const massive = document_filter.filter(
        (res) => res.basic_information.service_type.toLowerCase() == "massive"
      ).length;
      const call = document_filter.filter(
        (res) => res.basic_information.service_type.toLowerCase() == "call"
      ).length;
      return {
        ...result?._doc,
        campaigns_types: {
          sms,
          flash,
          token,
          massive,
          call,
        },
      };
    });
    return res.status(200).json({ data: filter_constcenter });
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
