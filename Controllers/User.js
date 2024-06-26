const model = require("../Models/User");
const Users = model.Users;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { json } = require("express");
const { text } = require("body-parser");
// exports.login = async (req, res) => {
//   let user = await Users.findOne({ Email: req.body.Email });
//   if (user) {
//     const comparepass = req.body.password === user.password;
//     if (comparepass) {
//       const data = {
//         user: {
//           id: user.id,
//         },
//       };
//       const token = jwt.sign(data, "Secret-ecom");
//       res.json({ success: true, token });
//     } else {
//       res.json({ success: false, error: "Wrong password" });
//     }
//   } else {
//     res.json({ success: false, error: " WrongEmail adress " });
//   }
// };
exports.login = async (req, res) => {
  let user = await Users.findOne({ Email: req.body.Email });
  if (!user) {
    return res.json({ success: false, error: "User not found" });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.json({ success: false, error: "Invalid credentials" });
  }

  const data = { user: { id: user.id } };
  const token = jwt.sign(data, process.env.JWT_SECRET || "Secret-ecom");

  res.json({ success: true, token });
};

exports.signup = async (req, res) => {
  let verifieduser = await Users.findOne({ Email: req.body.Email });

  if (verifieduser) {
    return res.status(400).json({
      success: false,
      error: "Existing user found with same email Adress",
    });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    Username: req.body.Username,
    Email: req.body.Email,
    password: hashedPassword,
  });
  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, process.env.JWT_SECRET || "Secret-ecom");
  res.json({ success: true, token });
};

const generateToken = () => {
  return jwt.sign(
    { data: "reset_password_token" },
    process.env.JWT_SECRET || "Secret-ecom",
    {
      expiresIn: "1h",
    }
  );
};
exports.forgotPassword = async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ success: false, error: "Email is required" });
  }

  const { email } = req.body;

  try {
    // Find the user by email
    const user = await Users.findOne({ Email: email });

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Generate reset token
    const token = generateToken();

    // Set reset password token and expiration time
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send reset password email
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: "faizancreation25@gmail.com",
        pass: process.env.BREVO_API_KEY,
      },
    });
    var mailOptions = {
      from: "faizancreation25@gmail.com",
      to: user.Email,
      subject: "Reset password",
      text:
        `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
        `${req.headers.origin}/reset-password/${token}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
};

exports.resetPassword = async (req, res) => {
  const resetToken = req.params.token;
  const { newPassword } = req.body;

  try {
    const user = await Users.findOne({ resetPasswordToken: resetToken });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "Invalid or expired token" });
    }

    // Check if the token has expired
    if (user.resetPasswordExpires < Date.now()) {
      return res
        .status(401)
        .json({ success: false, error: "Token has expired" });
    }

    // Check if the new password is the same as the previous one
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        error: "New password cannot be the same as the previous one",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update user's password and clear reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    // console.error("Error resetting password:", error);
    res.status(500).json({ success: false, error: "Failed to reset password" });
  }
};
