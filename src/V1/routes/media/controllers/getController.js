//Defaults imports
const asyncHandler = require("express-async-handler");

//Controllers

//Models

const Audio = require("../../../models/audio/audio");

//Utils
const errorGenerator = require("../../../utils/error_generator/error_generator");

exports.all_audio = asyncHandler(async (req, res) => {
  try {
    const find_audio = await Audio.find();
    if (!find_audio)
      errorGenerator({ message: "Audio not found!", status: 404 });
    return res.status(200).json({ data: find_audio });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
exports.audio = asyncHandler(async (req, res) => {
  try {
    const find_audio = await Audio.findOne({ _id: req.params.id });
    if (!find_audio)
      errorGenerator({ message: "Audio not found!", status: 404 });
    return res.status(200).json({ data: find_audio });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
exports.audio_per_user = asyncHandler(async (req, res) => {
  try {
    const find_audio = await Audio.find({
      "data_information.user_id": req.params.id,
    });
    if (find_audio.length == 0)
      errorGenerator({ message: "Audio not found!", status: 404 });
    return res.status(200).json({ data: find_audio });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
