const model = require("../Models/contactModel");
const Contact = model.Contact;

exports.contactForm = async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  });
  await contact.save();
  
};
