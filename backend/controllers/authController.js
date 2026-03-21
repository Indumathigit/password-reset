const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

// REGISTER - create a new user account
exports.register = async (req, res) => {
  try {
    var email = req.body.email;
    var password = req.body.password;

    // Check if user already exists
    var existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "An account with this email already exists" });
    }

    // Hash the password before saving
    var hashed = await bcrypt.hash(password, 10);
    var user = new User({ email, password: hashed });
    await user.save();

    res.json({ msg: "Registration successful" });
  } catch (err) {
    console.log("register error:", err);
    res.status(500).json({ msg: "Something went wrong. Please try again." });
  }
};

// LOGIN - verify credentials
exports.login = async (req, res) => {
  try {
    var email = req.body.email;
    var password = req.body.password;

    // Check if user exists
    var user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "No account found with that email" });
    }

    // Compare entered password with stored hashed password
    var isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    res.json({ msg: "Login successful" });
  } catch (err) {
    console.log("login error:", err);
    res.status(500).json({ msg: "Something went wrong. Please try again." });
  }
};

// FORGOT PASSWORD - generate reset token and send email
exports.forgotPassword = async (req, res) => {
  try {
    var email = req.body.email;

    var user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "No account found with that email" });
    }

    // Generate a random token and set 15 min expiry
    var token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    var resetLink = `${process.env.CLIENT_URL}/reset/${token}`;

    await sendEmail(
      email,
      "Password Reset Request",
      `Hello,\n\nClick the link below to reset your password. This link expires in 15 minutes.\n\n${resetLink}\n\nIf you did not request this, please ignore this email.`
    );

    res.json({ msg: "Reset link sent to your email" });
  } catch (err) {
    console.log("forgotPassword error:", err);
    res.status(500).json({ msg: "Something went wrong. Please try again." });
  }
};

// VERIFY TOKEN - check if token is valid and not expired
exports.verifyToken = async (req, res) => {
  try {
    var token = req.params.token;

    var user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    res.json({ msg: "Valid token" });
  } catch (err) {
    console.log("verifyToken error:", err);
    res.status(500).json({ msg: "Something went wrong. Please try again." });
  }
};

// RESET PASSWORD - save new password and clear the token
exports.resetPassword = async (req, res) => {
  try {
    var token = req.params.token;
    var password = req.body.password;

    var user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    // Hash the new password before saving
    var hashed = await bcrypt.hash(password, 10);
    user.password = hashed;

    // Clear the reset token so it cannot be reused
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    res.json({ msg: "Password updated successfully" });
  } catch (err) {
    console.log("resetPassword error:", err);
    res.status(500).json({ msg: "Something went wrong. Please try again." });
  }
};