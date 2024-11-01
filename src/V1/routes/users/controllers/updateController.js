//Defaults imports
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Controllers

//Models
const User = require("../../../models/user/user");

//Utils
const dataValidator = require("../../../utils/data_validator/data_validator");
const errorGenerator = require("../../../utils/error_generator/error_generator");

//Update Profile image
exports.update_avatar = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    //Variables
    const { avatar } = req.body;

    if (!dataValidator(req.body, ["avatar"]))
      throw errorGenerator({ message: "Data not found!", status: 404 });

    const _find = await User.findOne({ _id: id }).lean();

    if (!_find)
      throw errorGenerator({ message: "User not found!", status: 404 });

    const _update = await User.updateOne(
      { _id: id },
      {
        $set: {
          basic_information: {
            ..._find.basic_information,
            avatar: avatar,
          },
        },
      }
    );
    if (!_update)
      throw errorGenerator({ message: "Error to update!", status: 400 });
    return res.status(200).json({ message: "Success!", data: _update });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
exports.update_basic_info = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    //Variables
    const {
      user_name,
      email,
      phone,
      full_name,
      cpf,
      rg,
      corporate_reason,
      cnpj,
      state_registration,
      contributor_type,
      cep,
      neighborhood,
      city,
      state,
      number,
      complement,
      user_email,
    } = req.body;

    const _find = await User.findOne({ _id: id })
      .select("_id basic_information login_information")
      .lean();

    const _find_email = await User.findOne({ "login_information.email": email })
      .select("_id")
      .lean();
    if (_find_email && user_email != _find.login_information.email)
      throw errorGenerator({ message: "E-mail já existente!", status: 409 });
    if (!_find)
      throw errorGenerator({ message: "User not found!", status: 404 });

    const _update = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ..._find,
          basic_information: {
            ..._find.basic_information,
            pf: {
              ..._find.basic_information.pf,
              full_name,
              cpf,
              rg,
            },
            pj: {
              ..._find.basic_information.pj,
              corporate_reason,
              cnpj,
              state_registration,
              contributor_type,
            },
            address: {
              ..._find.basic_information.address,
              cep,
              neighborhood,
              city,
              state,
              number,
              complement,
            },
          },
          login_information: {
            ..._find.login_information,
            user_name,
            email,
            phone,
          },
        },
      }
    );
    if (!_update)
      throw errorGenerator({ message: "Error to update!", status: 400 });
    return res.status(200).json({ message: "Successfull!", data: _update });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
