const mongoose = require("mongoose");
const { Schema } = mongoose;

const userAddrSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  address: String,
  aptSuite: String,
  postalCode: String,
  city: String,
  telephone: String,
  country: String,
});
exports.userAddr = mongoose.model("userAddr", userAddrSchema);
