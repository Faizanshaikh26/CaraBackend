const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  Username: { type: String },
  Email: { type: String, unique: true },
  password: { type: String },
  cartdata: { type: Object },
  date: { type: Date, default: Date.now },
  resetPasswordToken: String, // Field to store the reset token
  resetPasswordExpires: Date, // Field to store the expiration time of the token
});

exports.Users = mongoose.model("User", userSchema);
