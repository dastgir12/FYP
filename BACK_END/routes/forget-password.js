const express = require("express");
const User = require("../model/User");
const nodemailer = require("nodemailer");
const { updateOne } = require("../model/User");
const randomstring = require("randomstring");
const config = require("config");
// const { response } = require("express");
const router = express.Router();

const sendResetPasswordMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: config.get("emailUser"),
        pass: config.get("passwordUser"),
      },
    });
    const mailOptions = {
      from: config.get("emailUser"),
      to: email,
      subject: "for reset password",
      // text: `http://localhost:5000/reset-password/${User.token}`
      html:
        '<p>plz reset your password by clicking on this link <a href="http://localhost:5000/api/reset-password?token=' +
        token +
        '">reset your password</a>',
    };

    // Send an email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
      // Close the transporter
      transporter.close();
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

//route
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await User.findOne({ email: email });

    if (userData) {
      const randomString = randomstring.generate();
      const data = User.updateOne(
        { email: email },
        { $set: { token: randomString } }
      );
      // res.send(data)
      sendResetPasswordMail(userData.name, userData.email, randomString);
      res.status(200).send({ success: true, msg: "Please check your email" });
    } else {
      res.status(200).send({ success: true, msg: "This email does not exist" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

module.exports = router;
