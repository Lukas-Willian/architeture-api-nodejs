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

exports.create_user = asyncHandler(async (req, res, next) => {
  try {
    //Default variables
    const date = new Date();

    //Body Variables
    const { full_name, user_name, email, password } = req.body;

    //Check body info
    if (
      !dataValidator(req.body, ["full_name", "user_name", "email", "password"])
    )
      return errorGenerator({ message: "Data not found!", status: 404 });

    //Check exist user
    const find_user = await User.findOne({ "login_information.email": email })
      .select("_id")
      .lean();
    if (find_user)
      return errorGenerator({
        message: "User already exists in system!",
        status: 409,
      });

    const user_data = new User({
      basic_information: {
        full_name: full_name,
        type: "PF",
        adress: {
          cep: 0,
          neighborhood: "",
          city: "",
          state: "",
          number: 0,
          complement: "",
        },
        company: {
          cnpj: 0,
          contributor_type: "",
        },
      },
      login_information: {
        user_name: user_name,
        email: email,
        phone: 0,
      },
      authentication_info: {
        password: password,
        recovery: {
          recovery_code: "",
        },
        confirm: {
          confirm_code: "",
          confirm_account: false,
        },
      },
      created_date: date,
      last_login: date,
    });
    if (!user_data)
      errorGenerator({ message: "Data not generate!", status: 400 });
    const user_save = await user_data.save();
    if (!user_save)
      errorGenerator({ message: "Error to save user!", status: 400 });
    return res.status(200).json({ message: "Successfull!", data: user_save });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});

exports.authenticate_user = asyncHandler(async (req, res, next) => {
  try {
    //Default variables
    const date = new Date();

    //Body variables
    const { email, password } = req.body;

    //Verify Data
    if (!dataValidator(req.body, ["email", "password"]))
      errorGenerator({ message: "Data not found!", status: 404 });

    const find_update = await User.findOneAndUpdate(
      { "login_information.email": email },
      {
        $set: {
          last_login: date,
        },
      }
    ).select("_id login_information authentication_info");
    if (!find_update)
      errorGenerator({ message: "User not found!", status: 404 });

    const compare = await bcrypt.compare(
      password,
      find_update.authentication_info.password
    );
    if (!compare)
      errorGenerator({ message: "Incorrect password", status: 403 });

    const id = find_update?._id;
    const authenticate_account =
      find_update.authentication_info.confirm.confirm_account;
    const user_id = find_update?._id;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: 5000000,
    });
    if (!token)
      errorGenerator({ message: "Error to generate token!", status: 400 });
    return res.status(200).json({
      auth: true,
      token: token,
      user_info: {
        user_id: user_id,
        authenticate_account: authenticate_account,
      },
    });
  } catch (err) {
    console.log(err?.message);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error!",
      error: err.status,
    });
  }
});
