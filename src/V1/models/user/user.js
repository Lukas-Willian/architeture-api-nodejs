//Defaults imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Default Variables
const Schema = mongoose.Schema;

const userSchema = new Schema({
  basic_information: {
    full_name: { type: String, required: true },
    type: { type: String, required: true },
    cpf: { type: String, required: false },
    adress: {
      cep: { type: Number, required: false },
      neighborhood: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      number: { type: Number, required: false },
      complement: { type: String, required: false },
    },
    company: {
      cnpj: { type: Number, required: false },
      contributor_type: { type: String, required: false },
    },
  },
  login_information: {
    user_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: false },
  },
  authentication_info: {
    password: { type: String, required: false },
    recovery: {
      recovery_code: { type: String, required: false },
    },
    confirm: {
      confirm_code: { type: String, required: false },
      confirm_account: { type: Boolean, required: false },
    },
  },
  data_information: {
    cost: { type: [String], required: false },
    campaign: { type: [String], required: false },
    contact: { type: [String], required: false },
    credits: {
      sms: { type: Number, required: false },
      call: { type: Number, required: false },
    },
  },
  created_date: {
    type: Date,
    required: true,
  },
  last_login: {
    type: Date,
    required: false,
  },
});

userSchema.pre("save", function (next) {
  try {
    if (this.authentication_info.password) {
      if (this.authentication_info.password) {
        bcrypt.genSalt(10).then((salt) => {
          bcrypt.hash(this.authentication_info.password, salt).then((hash) => {
            this.authentication_info.password = hash;
            next();
          });
        });
      }
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    next();
  }
});

userSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const password = this.getUpdate().$set.authentication_info.password;
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      this.getUpdate().$set.authentication_info.password = hashed;
    }
    next();
  } catch (err) {}
});

module.exports = mongoose.model("User", userSchema);
