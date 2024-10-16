//Defaults imports
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

require("dotenv").config();

//Controllers

//Services
const apiWorker = require("../../../service/apiWorker/api_worker");

//Models
const User = require("../../../models/user/user");
const Campaign = require("../../../models/campaign/campaign");
const Costcenter = require("../../../models/cost_center/cost_center");

//Utils
const dataValidator = require("../../../utils/data_validator/data_validator");
const errorGenerator = require("../../../utils/error_generator/error_generator");
const randomCode = require("../../../utils/random_code/randomCode");

exports.create_costcenter = asyncHandler(async (req, res, next) => {
  try {
    //Default variables
    const { id } = req.params;
    const date = new Date();

    const { costcenter_name } = req.body;

    if (!dataValidator(req.body, ["costcenter_name"]))
      errorGenerator({ message: "Data not found!", status: 404 });

    const costcenter_data = new Costcenter({
      basic_information: {
        name: costcenter_name,
      },
      data_information: {
        user_id: id.toString(),
      },
      created_date: date,
    });
    if (!costcenter_data)
      errorGenerator({ message: "Erro to generated data!", status: 400 });
    const costcenter_save = await costcenter_data.save();
    if (!costcenter_save)
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
            cost: [
              ...find_user.data_information.cost,
              costcenter_save._id.toString(),
            ],
          },
        },
      }
    );
    if (!_update_user)
      errorGenerator({ message: "Error to update user!", status: 400 });
    return res.status(200).json({ data: costcenter_save });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
