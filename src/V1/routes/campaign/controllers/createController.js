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

exports.create_campaign = asyncHandler(async (req, res, next) => {
  try {
    //Default variables
    const { id } = req.params;
    const date = new Date();

    const {
      campaign_name,
      costcenter_id,
      campaign_type,
      service_type,
      messages,
      contact_list,
      delete_list,
      schedule,
    } = req.body;

    if (
      !dataValidator(req.body, [
        "campaign_name",
        "costcenter_id",
        "campaign_type",
        "service_type",
        "messages",
        "contact_list",
        "delete_list",
        "schedule",
      ])
    )
      errorGenerator({ message: "Data not found!", status: 404 });

    if (!mongoose.isValidObjectId(costcenter_id))
      errorGenerator({ message: "Invalid costcenter Id!", status: 405 });

    const find_user = await User.findOne({ _id: id }).select(
      "_id data_information"
    );
    if (!find_user) errorGenerator({ message: "User not found!", status: 404 });
    const find_costcenter = await Costcenter.findOne({
      _id: costcenter_id,
    }).select("_id data_information");
    if (!find_costcenter)
      errorGenerator({ message: "Cost center not found!", status: 404 });

    const find_contact = await Contact.find({ _id: { $in: contact_list } });
    const contacts =
      find_contact.length <= 0 ? [] : find_contact.map((res) => res._id);
    const campaign_data = new Campaign({
      basic_information: {
        name: campaign_name,
        type: campaign_type,
        service_type: service_type,
      },
      data_information: {
        user_id: id,
        costcenter_id: costcenter_id,
        message: messages,
        contact_list: contacts,
        delete_list: delete_list,
        date: {
          schedule: schedule,
        },
        campaign_sends: {
          total: 0,
          valid: 0,
          invalid: 0,
          send: 0,
        },
      },
      created_date: date,
    });
    if (!campaign_data)
      errorGenerator({ message: "Erro to generated data!", status: 400 });
    const campaign_save = await campaign_data.save();
    if (!campaign_save)
      errorGenerator({ message: "Error to save data!", status: 400 });

    const _update_costcenter = await Costcenter.updateOne(
      { _id: find_costcenter._id },
      {
        $set: {
          data_information: {
            ...find_costcenter.data_information,
            campaign: [
              ...find_costcenter.data_information.campaign,
              campaign_data?._id.toString(),
            ],
          },
        },
      }
    );

    if (!_update_costcenter)
      errorGenerator({ message: "Error to update cost center!", status: 400 });

    const _update_user = await User.updateOne(
      { _id: id },
      {
        $set: {
          data_information: {
            ...find_user.data_information,
            campaign: [
              ...find_user.data_information.campaign,
              campaign_save._id.toString(),
            ],
          },
        },
      }
    );
    if (!_update_user)
      errorGenerator({ message: "Error to update user!", status: 400 });
    return res.status(200).json({ data: campaign_save });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
