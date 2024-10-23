//Defaults imports
const asyncHandler = require("express-async-handler");

//Controllers

//Models
const Message = require("../../../models/messages/messages");
const Blacklist = require("../../../models/blacklist/blacklist");

//Utils
const errorGenerator = require("../../../utils/error_generator/error_generator");

exports.all_messages = asyncHandler(async (req, res) => {
  try {
    const find_message = await Message.find();
    if (!find_message)
      errorGenerator({ message: "Message not found!", status: 404 });
    return res.status(200).json({ data: find_message });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
exports.message_by_id = asyncHandler(async (req, res) => {
  try {
    const find_mesasge = await Message.findOne({ _id: req.params.id });
    if (!find_mesasge)
      errorGenerator({ message: "Message not found!", status: 404 });
    return res.status(200).json({ data: find_mesasge });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
exports.message_per_user = asyncHandler(async (req, res) => {
  try {
    const find_message = await Message.find({
      "data_information.user_id": req.params.id,
    });
    if (find_message.length == 0)
      errorGenerator({ message: "Message not found!", status: 404 });
    return res.status(200).json({ data: find_message });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
