//Defaults imports
const asyncHandler = require("express-async-handler");

//Controllers

//Models
const User = require("../../../models/user/user");

//Utils
const errorGenerator = require("../../../utils/error_generator/error_generator");

exports.all_users = asyncHandler(async (req, res, next) => {
  try {
    const find = await User.find()
      .select("_id basic_information created_date last_login")
      .lean();
    if (!find) errorGenerator({ message: "Users not found!", status: 404 });
    return res.status(200).json({ data: find });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
exports.user = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const find = await User.findOne({ _id: id })
      .select(
        "_id basic_information login_information data_information created_date last_login"
      )
      .lean();
    if (!find) errorGenerator({ message: "Users not found!", status: 404 });
    return res.status(200).json({ data: find });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
