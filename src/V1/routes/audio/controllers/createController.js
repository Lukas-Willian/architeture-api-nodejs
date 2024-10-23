//Defaults imports
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

require("dotenv").config();

//Controllers

//Services
const apiWorker = require("../../../service/apiWorker/api_worker");

//Models
const User = require("../../../models/user/user");
const Audio = require("../../../models/audio/audio");

//Utils
const dataValidator = require("../../../utils/data_validator/data_validator");
const errorGenerator = require("../../../utils/error_generator/error_generator");
const randomCode = require("../../../utils/random_code/randomCode");
const contact = require("../../../models/contact/contact");

exports.create_audio = asyncHandler(async (req, res, next) => {
  try {
    //Default variables
    const date = new Date();
    const { id } = req.params;
    //Body variables
    const { name, archive_name, description, archive, archive_type, duration } =
      req.body;

    if (
      !dataValidator(req.body, [
        "name",
        "archive_name",
        "description",
        "archive",
        "archive_type",
        "duration",
      ])
    )
      throw errorGenerator({ message: "Data not found!", status: 404 });

    const audio_data = new Audio({
      basic_information: {
        name: name,
        archive_name: archive_name,
        description: description,
        status: true,
      },
      data_information: {
        user_id: id,
        archive_type: archive_type,
        archive: archive,
        duration: duration,
      },
      created_date: date,
    });
    if (!audio_data)
      throw errorGenerator({
        message: "Error to generated data!",
        status: 400,
      });
    const audio_save = await audio_data.save();
    if (!audio_save)
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
            audio: [
              ...find_user.data_information.audio,
              audio_save._id.toString(),
            ],
          },
        },
      }
    );
    if (!_update_user)
      throw errorGenerator({ message: "Error to update user!", status: 400 });
    return res.status(200).json({ data: audio_save });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
