const model = require("../Models/UseraddrModel");
const userAddress = model.userAddr;

exports.userAddr = async (req, res) => {
  try {
    const formData = req.body;

    if (
      !formData.email ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.address ||
      !formData.postalCode ||
      !formData.city ||
      !formData.telephone
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newFormData = new userAddress(formData);
    await newFormData.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
