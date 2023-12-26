const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    surname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },

    patronomyc: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    CoverPic: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    region: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
