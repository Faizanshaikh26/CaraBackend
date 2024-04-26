const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
  name: { type: String },
  email: { type: String },
  subject: { type: String },
  message: { type: String },
});

exports.Contact = mongoose.model("Contact", contactSchema);
