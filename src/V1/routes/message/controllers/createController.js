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
const Message = require("../../../models/messages/messages");
const Costcenter = require("../../../models/cost_center/cost_center");

//Utils
const dataValidator = require("../../../utils/data_validator/data_validator");
const errorGenerator = require("../../../utils/error_generator/error_generator");

exports.create_message = asyncHandler(async (req, res, next) => {
  try {
    //Default variables
    const date = new Date();
    const { id } = req.params;

    //Body variables
    const { name, description, messages } = req.body;

    if (!dataValidator(req.body, ["name", "description", "messages"]))
      throw errorGenerator({ message: "Data not found!", status: 404 });

    const message_data = new Message({
      basic_information: {
        name: name,
        description: description,
        status: true,
      },
      data_information: {
        user_id: id,
        messages: messages,
      },
      created_date: date,
    });
    if (!message_data)
      throw errorGenerator({
        message: "Error to generated data!",
        status: 400,
      });
    const message_save = await message_data.save();
    if (!message_save)
      throw errorGenerator({ message: "Error to save data!", status: 400 });

    const find_user = await User.findOne({ _id: id }).select(
      "_id data_information"
    );
    const _update_user = await User.updateOne(
      { _id: id },
      {
        $set: {
          data_information: {
            ...find_user.data_information,
            messages: [
              ...find_user.data_information.blacklist,
              message_save._id.toString(),
            ],
          },
        },
      }
    );
    if (!_update_user)
      throw errorGenerator({ message: "Error to update user!", status: 400 });

    return res.status(200).json({ data: message_save });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});