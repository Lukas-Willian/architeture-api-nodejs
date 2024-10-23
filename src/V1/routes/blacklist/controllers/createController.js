//Defaults imports
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

require("dotenv").config();

//Controllers

//Services
const apiWorker = require("../../../service/apiWorker/api_worker");

//Models
const User = require("../../../models/user/user");
const Blacklist = require("../../../models/blacklist/blacklist");

//Utils
const dataValidator = require("../../../utils/data_validator/data_validator");
const errorGenerator = require("../../../utils/error_generator/error_generator");

exports.create_blacklist_number = asyncHandler(async (req, res, next) => {
  try {
    //Default variables
    const date = new Date();
    const { id } = req.params;

    //Body variables
    const { number } = req.body;

    if (!dataValidator(req.body, ["number"]))
      errorGenerator({ message: "Data not found!", status: 404 });

    const blacklist_data = new Blacklist({
      data_information: {
        user_id: id,
        number: number,
      },
      expired_date: date,
      created_date: date,
    });
    if (!blacklist_data)
      errorGenerator({ message: "Error to generated data!", status: 400 });
    const blacklist_save = await blacklist_data.save();
    if (!blacklist_save)
      errorGenerator({ message: "Error to save data!", status: 400 });

    const find_user = await User.findOne({ _id: id }).select(
      "_id data_information"
    );
    const _update_user = await User.updateOne(
      { _id: id },
      {
        $set: {
          data_information: {
            ...find_user.data_information,
            blacklist: [
              ...find_user.data_information.blacklist,
              blacklist_save._id.toString(),
            ],
          },
        },
      }
    );
    if (!_update_user)
      errorGenerator({ message: "Error to update user!", status: 400 });
    return res.status(200).json({ data: blacklist_save });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
