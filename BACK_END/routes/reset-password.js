const express = require("express");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { findByIdAndUpdate } = require("../model/User");
const router = express.Router();


const securePassword = async (password) => {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
  } catch (error) {
    res.send(400).send(error.message);
  }
};



router.get("/", async (req, res) => {
  try {
    const token = req.query.token;
    const tokenData = await User.findOne({ token: token });

    if (tokenData) {
      const password = req.body.password;
      const newPassword = await securePassword(password);
      userData = await User.findByIdAndUpdate(
        { _id: tokenData._id },
        { $set: { password: newPassword, token: " " } },
        { new: true }
      );
      res
        .status(200)
        .send({
          success: true,
          msg: "User password has been reset",
          data: userData,
        });
    } else {
      res
        .status(200)
        .send({ success: true, msg: "this token has been expired" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

module.exports = router;
