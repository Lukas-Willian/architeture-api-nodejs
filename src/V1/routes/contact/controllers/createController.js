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
const Contact = require("../../../models/contact/contact");

//Utils
const dataValidator = require("../../../utils/data_validator/data_validator");
const errorGenerator = require("../../../utils/error_generator/error_generator");
const randomCode = require("../../../utils/random_code/randomCode");
const contact = require("../../../models/contact/contact");

exports.create_contact = asyncHandler(async (req, res, next) => {
  try {
    //Default variables
    const date = new Date();
    const { id } = req.params;

    //Body variables
    const { name, contact_list } = req.body;

    if (!dataValidator(req.body, ["name", "contact_list"]))
      errorGenerator({ message: "Data not found!", status: 404 });

    const contact_data = new Contact({
      basic_information: {
        name: name,
      },
      data_information: {
        user_id: id,
        contact_list: contact_list?.map((res) => {
          return {
            id: `${res}-${randomCode(15)}`,
            to: res,
          };
        }),
      },
      created_date: date,
    });
    if (!contact_data)
      errorGenerator({ message: "Error to generated data!", status: 400 });
    const contact_save = await contact_data.save();
    if (!contact_save)
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
            contact: [
              ...find_user.data_information.contact,
              contact_save._id.toString(),
            ],
          },
        },
      }
    );
    if (!_update_user)
      errorGenerator({ message: "Error to update user!", status: 400 });
    return res.status(200).json({ data: contact_save });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
